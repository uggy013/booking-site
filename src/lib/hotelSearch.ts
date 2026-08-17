import type { Hotel } from '../data/hotels';

const fallbackHotelPhoto =
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80';
const fallbackCafePhoto =
  'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=700&q=80';
const fallbackRoomPhoto =
  'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=700&q=80';

function makeHotelId(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-zа-яё0-9]+/gi, '-')
    .replace(/^-+|-+$/g, '');
}

export function createSearchedHotel(name: string): Hotel {
  const hotelName = name.trim();

  return {
    id: `searched-${makeHotelId(hotelName) || 'hotel'}`,
    name: hotelName,
    location: 'Можно выбрать при бронировании',
    address: 'Адрес уточняется после выбора города',
    price: 'от 45 000 ₸ / ночь',
    rating: '4.7',
    description:
      'Этот отель добавлен по твоему поиску. Можно перейти к бронированию и оформить заявку.',
    details: {
      yard: 'Локацию и двор можно уточнить при бронировании',
      cafe: 'Кафе, завтраки и ресторан зависят от выбранного отеля',
      rooms: 'Доступные номера подбираются после заявки',
    },
    photos: {
      yard: fallbackHotelPhoto,
      cafe: fallbackCafePhoto,
      room: fallbackRoomPhoto,
    },
    image: fallbackHotelPhoto,
  };
}
