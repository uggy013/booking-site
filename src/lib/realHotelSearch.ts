import type { Hotel } from '../data/hotels';
import { createSearchedHotel } from './hotelSearch';
import { isSupabaseConfigured, supabase } from './supabase';

type WikiSearchPage = {
  key: string;
  title: string;
  description?: string;
  excerpt?: string;
};

type WikiApiSearchPage = {
  title: string;
  snippet?: string;
};

type WikiSearchResponse = {
  query?: {
    search?: WikiApiSearchPage[];
  };
};

type WikiSummary = {
  title: string;
  extract?: string;
  thumbnail?: {
    source: string;
  };
  content_urls?: {
    desktop?: {
      page?: string;
    };
  };
};

type WikiMediaItem = {
  title?: string;
  type?: string;
  original?: {
    source?: string;
  };
  thumbnail?: {
    source?: string;
  };
};

type WikiMediaResponse = {
  items?: WikiMediaItem[];
};

type CommonsImage = {
  title?: string;
  imageinfo?: Array<{
    mime?: string;
    thumburl?: string;
    url?: string;
  }>;
};

type CommonsResponse = {
  query?: {
    pages?: Record<string, CommonsImage>;
  };
};

type AiHotel = {
  name?: unknown;
  location?: unknown;
  address?: unknown;
  price?: unknown;
  rating?: unknown;
  description?: unknown;
  yard?: unknown;
  cafe?: unknown;
  rooms?: unknown;
};

const wikiApi = 'https://en.wikipedia.org';
const commonsApi = 'https://commons.wikimedia.org/w/api.php';
const hotelWords = ['hotel', 'resort', 'inn', 'hostel', 'motel', 'suites', 'lodging'];

function firstSentence(text: string) {
  return text.split('. ')[0] || text;
}

function getText(value: unknown) {
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}

function getAiJson(text: string) {
  const jsonText = text
    .trim()
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```$/i, '')
    .trim();

  try {
    return JSON.parse(jsonText) as AiHotel;
  } catch {
    return null;
  }
}

function getPhotoSearchTitle(pageTitle: string, query: string) {
  return pageTitle.toLowerCase().includes(query.toLowerCase()) ? pageTitle : query;
}

function uniqueImages(images: string[]) {
  return Array.from(new Set(images)).filter((url) => {
    try {
      return /\.(jpg|jpeg|png|webp)$/i.test(new URL(url).pathname);
    } catch {
      return /\.(jpg|jpeg|png|webp)$/i.test(url);
    }
  });
}

function getImageScore(url: string, title: string | undefined, query: string) {
  const text = decodeURIComponent(`${title ?? ''} ${url}`).toLowerCase();
  const words = query
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length > 2);

  return words.reduce((score, word) => (text.includes(word) ? score + 1 : score), 0);
}

function isHotelPage(page: WikiSearchPage, summary: WikiSummary | null) {
  const text = [
    page.title,
    page.description ?? '',
    page.excerpt ?? '',
    summary?.title ?? '',
    summary?.extract ?? '',
  ]
    .join(' ')
    .toLowerCase();

  return hotelWords.some((word) => text.includes(word));
}

async function findWikipediaPage(query: string) {
  const params = new URLSearchParams({
    action: 'query',
    format: 'json',
    list: 'search',
    origin: '*',
    srsearch: `${query} hotel`,
    srlimit: '5',
  });
  const response = await fetch(`${wikiApi}/w/api.php?${params.toString()}`);

  if (!response.ok) {
    return [];
  }

  const data = (await response.json()) as WikiSearchResponse;
  return (
    data.query?.search?.map((page) => ({
      key: page.title,
      title: page.title,
      description: undefined,
      excerpt: page.snippet?.replace(/<[^>]+>/g, ''),
    })) ?? []
  );
}

async function loadWikipediaSummary(pageKey: string) {
  const response = await fetch(`${wikiApi}/api/rest_v1/page/summary/${encodeURIComponent(pageKey)}`);

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as WikiSummary;
}

async function loadWikipediaPhotos(pageKey: string) {
  const response = await fetch(`${wikiApi}/api/rest_v1/page/media-list/${encodeURIComponent(pageKey)}`);

  if (!response.ok) {
    return [];
  }

  const data = (await response.json()) as WikiMediaResponse;
  const photos =
    data.items
      ?.filter((item) => item.type === 'image')
      .map((item) => item.original?.source ?? item.thumbnail?.source ?? '') ?? [];

  return uniqueImages(photos);
}

async function searchCommonsPhotos(query: string) {
  const params = new URLSearchParams({
    action: 'query',
    format: 'json',
    generator: 'search',
    gsrnamespace: '6',
    gsrlimit: '20',
    gsrsearch: query,
    prop: 'imageinfo',
    iiprop: 'url|mime',
    iiurlwidth: '900',
    origin: '*',
  });
  const response = await fetch(`${commonsApi}?${params.toString()}`);

  if (!response.ok) {
    return [];
  }

  const data = (await response.json()) as CommonsResponse;
  const pages = Object.values(data.query?.pages ?? {});
  const rankedPhotos = pages
    .flatMap(
      (page) =>
        page.imageinfo
          ?.filter((image) => image.mime?.startsWith('image/'))
          .map((image) => ({ title: page.title, url: image.thumburl ?? image.url ?? '' })) ?? [],
    )
    .filter((image) => getImageScore(image.url, image.title, query) > 0)
    .sort((first, second) => getImageScore(second.url, second.title, query) - getImageScore(first.url, first.title, query))
    .map((image) => image.url);

  return uniqueImages(rankedPhotos);
}

async function loadCommonsPhotos(query: string) {
  const [exactPhotos, hotelPhotos] = await Promise.all([
    searchCommonsPhotos(`"${query}"`),
    searchCommonsPhotos(`"${query}" hotel`),
  ]);

  return uniqueImages([...exactPhotos, ...hotelPhotos]);
}

async function loadAiHotel(query: string): Promise<Hotel | null> {
  if (!isSupabaseConfigured) {
    return null;
  }

  const searchedHotel = createSearchedHotel(query);
  const system = [
    'You create hotel search results for a booking website.',
    'Return only valid JSON. No markdown.',
    'Use Russian text for user-facing fields.',
    'Do not invent exact street addresses if unsure; write a clear approximate location.',
  ].join(' ');
  const prompt = `Создай карточку отеля по запросу: "${query}".
Верни JSON с полями:
name, location, address, price, rating, description, yard, cafe, rooms.
price должен быть коротким, например "от 45 000 ₸ / ночь".
rating должен быть строкой от 4.0 до 5.0.`;

  const { data, error } = await supabase.functions.invoke('ai', {
    body: { prompt, system },
  });

  if (error || !data || typeof data.text !== 'string') {
    return null;
  }

  const aiHotel = getAiJson(data.text);
  if (!aiHotel) {
    return null;
  }

  const name = getText(aiHotel.name) ?? searchedHotel.name;
  const location = getText(aiHotel.location) ?? searchedHotel.location;
  const address = getText(aiHotel.address) ?? searchedHotel.address;
  const price = getText(aiHotel.price) ?? searchedHotel.price;
  const rating = getText(aiHotel.rating) ?? searchedHotel.rating;
  const description = getText(aiHotel.description) ?? searchedHotel.description;
  const yard = getText(aiHotel.yard) ?? searchedHotel.details.yard;
  const cafeText = getText(aiHotel.cafe) ?? searchedHotel.details.cafe;
  const rooms = getText(aiHotel.rooms) ?? searchedHotel.details.rooms;

  return {
    ...searchedHotel,
    id: `ai-${searchedHotel.id}`,
    name,
    location,
    address,
    price,
    rating,
    description,
    details: { yard, cafe: cafeText, rooms },
  };
}

function createHotelFromPhotos(query: string, photos: string[]) {
  const searchedHotel = createSearchedHotel(query);
  const mainPhoto = photos[0] ?? searchedHotel.image;

  return {
    ...searchedHotel,
    id: `photos-${searchedHotel.id}`,
    description: 'Photos were found by the hotel name in Wikimedia Commons.',
    details: {
      yard: 'Hotel photo found by name.',
      cafe: 'More hotel photos are shown when Wikimedia has them.',
      rooms: 'Room photos depend on what is available for this hotel.',
    },
    photos: {
      yard: photos[1] ?? mainPhoto,
      cafe: photos[2] ?? photos[1] ?? mainPhoto,
      room: photos[3] ?? photos[2] ?? mainPhoto,
    },
    image: mainPhoto,
  };
}

export async function loadRealHotel(query: string): Promise<Hotel | null> {
  const searchedHotel = createSearchedHotel(query);

  try {
    const aiHotel = await loadAiHotel(query);

    if (aiHotel) {
      return aiHotel;
    }

    const pages = await findWikipediaPage(query);

    for (const page of pages) {
      const summary = await loadWikipediaSummary(page.key);

      if (!isHotelPage(page, summary)) {
        continue;
      }

      const [pagePhotos, commonsPhotos] = await Promise.all([
        loadWikipediaPhotos(page.key),
        loadCommonsPhotos(getPhotoSearchTitle(page.title, query)),
      ]);
      const photos = uniqueImages([
        ...pagePhotos,
        ...commonsPhotos,
        summary?.thumbnail?.source ?? '',
        searchedHotel.image,
      ]);
      const mainPhoto = photos[0] ?? searchedHotel.image;

      return {
        ...searchedHotel,
        id: `real-${page.key}`,
        name: summary?.title ?? page.title,
        location: page.description ?? searchedHotel.location,
        address: summary?.content_urls?.desktop?.page ?? searchedHotel.address,
        description: summary?.extract ?? page.excerpt ?? searchedHotel.description,
        details: {
          yard: firstSentence(summary?.extract ?? page.excerpt ?? searchedHotel.details.yard),
          cafe: 'Photos and details are loaded from Wikimedia when they are available.',
          rooms: 'Room information can be checked while booking.',
        },
        photos: {
          yard: photos[1] ?? mainPhoto,
          cafe: photos[2] ?? photos[1] ?? mainPhoto,
          room: photos[3] ?? photos[2] ?? mainPhoto,
        },
        image: mainPhoto,
      };
    }

    const commonsPhotos = await loadCommonsPhotos(query);

    if (commonsPhotos.length > 0) {
      return createHotelFromPhotos(query, commonsPhotos);
    }

    return searchedHotel;
  } catch {
    return searchedHotel;
  }
}
