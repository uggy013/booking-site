import type { Hotel } from '../data/hotels';

export type Amenity = 'pool' | 'breakfast' | 'beach' | 'wifi' | 'parking' | 'restaurant';

export type SortMode = 'recommended' | 'rating' | 'price-low' | 'price-high';

export const amenities: Array<{ id: Amenity; title: string }> = [
  { id: 'pool', title: 'Бассейн' },
  { id: 'breakfast', title: 'Завтрак' },
  { id: 'beach', title: 'Пляж' },
  { id: 'wifi', title: 'Wi-Fi' },
  { id: 'parking', title: 'Парковка' },
  { id: 'restaurant', title: 'Ресторан' },
];

export function getHotelAmenities(hotel: Hotel) {
  const text = [hotel.name, hotel.location, hotel.description, ...Object.values(hotel.details)]
    .join(' ')
    .toLowerCase();

  return amenities.filter((amenity) => text.includes(amenity.id) || text.includes(amenity.title.toLowerCase()));
}

export function getHotelPrice(hotel: Hotel) {
  return Number(hotel.price.replace(/\D/g, '')) || 0;
}

export function sortHotels(hotels: Hotel[], sort: SortMode) {
  const sortedHotels = [...hotels];

  if (sort === 'rating') {
    return sortedHotels.sort((first, second) => Number(second.rating) - Number(first.rating));
  }

  if (sort === 'price-low') {
    return sortedHotels.sort((first, second) => getHotelPrice(first) - getHotelPrice(second));
  }

  if (sort === 'price-high') {
    return sortedHotels.sort((first, second) => getHotelPrice(second) - getHotelPrice(first));
  }

  return sortedHotels;
}

export function getHotelMapUrl(hotel: Hotel) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${hotel.name} ${hotel.address} ${hotel.location}`,
  )}`;
}

export function getHotelReviews(hotel: Hotel) {
  return [
    `Отличное расположение рядом с ${hotel.location.split(',')[0]}.`,
    `Гостям нравятся ${getHotelAmenities(hotel)[0]?.title.toLowerCase() ?? 'сервис'} и чистые номера.`,
    `Хороший вариант для короткой поездки с рейтингом ${hotel.rating}.`,
  ];
}
