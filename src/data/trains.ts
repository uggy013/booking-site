export type TrainDeal = {
  id: string;
  route: string;
  dates: string;
  price: string;
  trainName: string;
  duration: string;
  wagonType: string;
  hotelName: string;
  hotelArea: string;
};

export const trains: TrainDeal[] = [
  {
    id: 'ritz-train',
    route: 'Астана -> Алматы',
    dates: '20-24 августа',
    price: '12 500 ₸',
    trainName: 'Тальго 001',
    duration: '13 ч 30 мин',
    wagonType: 'Купе',
    hotelName: 'The Ritz-Carlton, Almaty',
    hotelArea: 'Esentai Tower',
  },
  {
    id: 'rixos-train',
    route: 'Шымкент -> Алматы',
    dates: '25-28 августа',
    price: '9 800 ₸',
    trainName: 'Южный экспресс',
    duration: '10 ч 20 мин',
    wagonType: 'Купе',
    hotelName: 'Rixos Almaty',
    hotelArea: 'центр',
  },
  {
    id: 'intercontinental-train',
    route: 'Караганда -> Алматы',
    dates: '14-16 сентября',
    price: '13 200 ₸',
    trainName: 'Сарыарка',
    duration: '16 ч',
    wagonType: 'Купе',
    hotelName: 'InterContinental Almaty',
    hotelArea: 'площадь Республики',
  },
  {
    id: 'novotel-train',
    route: 'Туркестан -> Алматы',
    dates: '6-9 сентября',
    price: '11 600 ₸',
    trainName: 'Туркестан',
    duration: '14 ч 40 мин',
    wagonType: 'Купе',
    hotelName: 'Novotel Almaty City Center',
    hotelArea: 'район Достык',
  },
  {
    id: 'kazakhstan-train',
    route: 'Актобе -> Алматы',
    dates: '10-12 сентября',
    price: '18 900 ₸',
    trainName: 'Алматы',
    duration: '31 ч',
    wagonType: 'Плацкарт',
    hotelName: 'Hotel Kazakhstan',
    hotelArea: 'центр',
  },
  {
    id: 'holiday-inn-train',
    route: 'Павлодар -> Алматы',
    dates: '12-15 сентября',
    price: '15 400 ₸',
    trainName: 'Ертис',
    duration: '22 ч 15 мин',
    wagonType: 'Купе',
    hotelName: 'Holiday Inn Almaty',
    hotelArea: 'Тимирязева',
  },
];
