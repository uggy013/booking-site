import type { CarClass, RentalCar } from '../data/cars';

export type CarBodyType = CarClass | 'sedan' | 'minivan' | 'sports';
export type CarSortMode = 'recommended' | 'price-low' | 'price-high' | 'seats';
export type PickupPlace = 'airport' | 'center' | 'hotel' | 'address';
export type CarExtra = 'child-seat' | 'driver' | 'insurance' | 'full-tank' | 'wifi';

export const carBodyTypes: Array<{ id: CarBodyType; title: string }> = [
  { id: 'sedan', title: 'Седан' },
  { id: 'suv', title: 'Кроссовер' },
  { id: 'minivan', title: 'Минивэн' },
  { id: 'premium', title: 'Бизнес' },
  { id: 'sports', title: 'Спорт' },
];

export const pickupPlaces: Array<{ id: PickupPlace; title: string }> = [
  { id: 'airport', title: 'Аэропорт' },
  { id: 'center', title: 'Центр города' },
  { id: 'hotel', title: 'Отель' },
  { id: 'address', title: 'Доставка по адресу' },
];

export const carExtras: Array<{ id: CarExtra; title: string; price: number }> = [
  { id: 'child-seat', title: 'Детское кресло', price: 2500 },
  { id: 'driver', title: 'Водитель', price: 18000 },
  { id: 'insurance', title: 'Полная страховка', price: 5000 },
  { id: 'full-tank', title: 'Полный бак', price: 12000 },
  { id: 'wifi', title: 'Wi-Fi роутер', price: 3000 },
];

export function getCarPrice(car: RentalCar) {
  const price = car.price.includes('$')
    ? Number(car.price.replace(/\D/g, '')) * 470
    : Number(car.price.replace(/\D/g, ''));

  return price || 0;
}

export function getCarBodyType(car: RentalCar): CarBodyType {
  const model = car.model.toLowerCase();

  if (model.includes('carnival')) {
    return 'minivan';
  }

  if (model.includes('bmw') || model.includes('lexus')) {
    return 'premium';
  }

  if (car.carClass === 'suv') {
    return 'suv';
  }

  return 'sedan';
}

export function sortCars(cars: RentalCar[], sort: CarSortMode) {
  const sortedCars = [...cars];

  if (sort === 'price-low') {
    return sortedCars.sort((first, second) => getCarPrice(first) - getCarPrice(second));
  }

  if (sort === 'price-high') {
    return sortedCars.sort((first, second) => getCarPrice(second) - getCarPrice(first));
  }

  if (sort === 'seats') {
    return sortedCars.sort((first, second) => second.seats - first.seats);
  }

  return sortedCars;
}

export function getRentalDays(startDate: string, endDate: string) {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  const dayMs = 24 * 60 * 60 * 1000;

  if (!startDate || !endDate || end <= start) {
    return 1;
  }

  return Math.max(1, Math.ceil((end - start) / dayMs));
}

export function getCarReviews(car: RentalCar) {
  return [
    `${car.model} удобно водить в городе ${car.city}.`,
    `${car.seats} мест и коробка ${car.transmission} подходят для поездок.`,
    `Хороший вариант от ${car.source} для аренды на день или дольше.`,
  ];
}
