export type FlightClass = 'economy' | 'comfort' | 'business';

export type FlightDeal = {
  id: string;
  route: string;
  dates: string;
  price: string;
  airline: string;
  duration: string;
  hotelName: string;
  hotelArea: string;
  flightClass: FlightClass;
  perks: string;
};

export const flights: FlightDeal[] = [
  {
    id: 'ritz-economy',
    route: 'Астана -> Алматы',
    dates: '20-24 августа',
    price: '24 900 ₸',
    airline: 'Air Astana',
    duration: '1 ч 50 мин',
    hotelName: 'The Ritz-Carlton, Almaty',
    hotelArea: 'Esentai Tower',
    flightClass: 'economy',
    perks: 'Ручная кладь 8 кг и стандартное место',
  },
  {
    id: 'rixos-economy',
    route: 'Шымкент -> Алматы',
    dates: '25-28 августа',
    price: '17 800 ₸',
    airline: 'SCAT',
    duration: '1 ч 25 мин',
    hotelName: 'Rixos Almaty',
    hotelArea: 'центр',
    flightClass: 'economy',
    perks: 'Базовый тариф для короткой поездки',
  },
  {
    id: 'kazakhstan-economy',
    route: 'Актау -> Алматы',
    dates: '18-22 августа',
    price: '29 500 ₸',
    airline: 'FlyArystan',
    duration: '3 ч 10 мин',
    hotelName: 'Hotel Kazakhstan',
    hotelArea: 'центр',
    flightClass: 'economy',
    perks: 'Электронная регистрация и ручная кладь',
  },
  {
    id: 'intercontinental-comfort',
    route: 'Астана -> Алматы',
    dates: '20-24 августа',
    price: '42 900 ₸',
    airline: 'Air Astana',
    duration: '1 ч 50 мин',
    hotelName: 'InterContinental Almaty',
    hotelArea: 'площадь Республики',
    flightClass: 'comfort',
    perks: 'Больше места для ног и багаж 23 кг',
  },
  {
    id: 'novotel-comfort',
    route: 'Туркестан -> Алматы',
    dates: '6-9 сентября',
    price: '34 700 ₸',
    airline: 'FlyArystan',
    duration: '1 ч 35 мин',
    hotelName: 'Novotel Almaty City Center',
    hotelArea: 'район Достык',
    flightClass: 'comfort',
    perks: 'Выбор места и быстрый проход на посадку',
  },
  {
    id: 'holiday-inn-comfort',
    route: 'Караганда -> Алматы',
    dates: '14-16 сентября',
    price: '32 600 ₸',
    airline: 'SCAT',
    duration: '1 ч 30 мин',
    hotelName: 'Holiday Inn Almaty',
    hotelArea: 'Тимирязева',
    flightClass: 'comfort',
    perks: 'Удобное место и багаж 20 кг',
  },
  {
    id: 'ritz-business',
    route: 'Астана -> Алматы',
    dates: '20-24 августа',
    price: '86 400 ₸',
    airline: 'Air Astana',
    duration: '1 ч 50 мин',
    hotelName: 'The Ritz-Carlton, Almaty',
    hotelArea: 'Esentai Tower',
    flightClass: 'business',
    perks: 'Бизнес-зал, питание и приоритетная посадка',
  },
  {
    id: 'rixos-business',
    route: 'Шымкент -> Алматы',
    dates: '25-28 августа',
    price: '66 800 ₸',
    airline: 'SCAT',
    duration: '1 ч 25 мин',
    hotelName: 'Rixos Almaty',
    hotelArea: 'центр',
    flightClass: 'business',
    perks: 'Приоритетный багаж и комфортное кресло',
  },
  {
    id: 'intercontinental-business',
    route: 'Актау -> Алматы',
    dates: '18-22 августа',
    price: '92 500 ₸',
    airline: 'Air Astana',
    duration: '3 ч 10 мин',
    hotelName: 'InterContinental Almaty',
    hotelArea: 'площадь Республики',
    flightClass: 'business',
    perks: 'Просторное кресло и питание на борту',
  },
];
