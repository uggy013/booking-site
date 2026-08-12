export type HotelDetails = {
  yard: string;
  cafe: string;
  rooms: string;
};

export type HotelPhotos = {
  yard: string;
  cafe: string;
  room: string;
};

export type Hotel = {
  id: string;
  name: string;
  location: string;
  address: string;
  price: string;
  rating: string;
  description: string;
  details: HotelDetails;
  photos: HotelPhotos;
  image: string;
};

const cafe =
  'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=700&q=80';
const room =
  'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=700&q=80';
const ritzPhoto =
  'https://www.travoh.com/wp-content/uploads/2022/03/012-The-Ritz-Carlton-Almaty-Hotel-Almaty-Kazakhstan-Exterior-Night.jpg';
const rixosPhoto =
  'https://media.licdn.com/dms/image/v2/C4D1BAQHgsn6ipqcxVQ/company-background_10000/company-background_10000/0/1626180810462/rixos_almaty_cover?e=2147483647&t=gFyfIlSp7w-1P2SA-weYuoQr4FTNuj4CyKXxpoiPSbM&v=beta';
const intercontinentalPhoto =
  'https://intercontinental-almaty-hotel.at-hotels.com/data/Photos/OriginalPhoto/12839/1283933/1283933692/almaty-intercontinental-almaty-by-ihg-photo-21.JPEG';
const novotelPhoto =
  'https://media.iceportal.com/117707/photos/88397742_4K.jpg';
const kazakhstanPhoto =
  'https://kazakhstanhotel.kz/wp-content/uploads/2023/09/ofice-1024x683.jpg';
const holidayInnPhoto = 'https://aw-d.tripcdn.com/images/0204h120004i4uksoBBCA.jpg';
const amanPhoto =
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80';
const stRegisAstanaPhoto =
  'https://www.travoh.com/wp-content/uploads/2021/11/002-The-St.-Regis-Astana-Hotel-Astana-Kazakhstan-Hotel-Exterior.jpg';
const hiltonAstanaPhoto =
  'https://hilton-astana.hotelsastana.kz/data/Photos/700x500w/16221/1622148/1622148647.JPEG';
const doubleTreeShymkentPhoto =
  'https://www.momondo.com/himg/fd/b3/f1/ice-509087-108288741-689365.jpg';
const rixosAktauPhoto =
  'https://qln0xxt0hw0ogxv1.imgix.net/https%3A%2F%2Fimages.ctfassets.net%2F944fk97h13dc%2FyzJEydmj8dT5UnY1MVg4j%2Fe40f2c6457700da8853c3fa1eac0e8d7%2FRixos_Water_World_Aktau_General_View_front.jpg?ixlib=js-3.8.0&s=7b1def944b599c364e6ac49aaefeacdd';
const plazaNewYorkPhoto =
  'https://hips.hearstapps.com/hmg-prod/images/plaza-hotel-in-new-york-city-at-night-royalty-free-image-1702328371.jpg?crop=1xw%3A1xh%3Bcenter%2Ctop';
const savoyLondonPhoto =
  'https://cdn.tasteatlas.com/images/restaurants/e4270c55b7444fd98bed659ec99f1b3f.jpg?w=600';
const ritzParisPhoto =
  'https://media.ritzparis.com/medias/domain12964/media100091/27353-wgei8ysic0-web4k.jpg?twic=v1%2Fcover%3D780x440%2Fquality%3D85';
const burjAlArabPhoto = 'https://myhome.at/wp-content/uploads/2022/07/BurjAlArab.jpg';
const mandarinTokyoPhoto = 'https://skyskysky.net/hotel-japan/13tokyo/05/photo/001.jpg';
const marinaBaySandsPhoto =
  'https://i.pinimg.com/originals/1a/25/cf/1a25cf74cb602036d46899da9616e18b.jpg';
const fourSeasonsIstanbulPhoto =
  'https://media.alotea.com/four-seasons-hotel-istanbul-at-sultanahmet-istanbul-cover.webp';
const parkHyattSydneyPhoto =
  'https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2016/10/17/1439/Park-Hyatt-Sydney-P079-Hotel-Exterior-with-Opera-House.jpg/Park-Hyatt-Sydney-P079-Hotel-Exterior-with-Opera-House.16x9.jpg';

export const hotels: Hotel[] = [
  {
    id: 'ritz-carlton-almaty',
    name: 'The Ritz-Carlton, Almaty',
    location: 'Алматы, Esentai Tower',
    address: 'проспект Аль-Фараби, 77/7',
    price: '170 000 ₸ / ночь',
    rating: '4.9',
    description: 'Пятизвездочный отель в Esentai Tower с видом на город и горы Заилийского Алатау.',
    details: {
      yard: 'Рядом Esentai Mall и деловой район',
      cafe: 'Рестораны, лаунж и завтраки в отеле',
      rooms: 'Номера Deluxe, Club и люксы',
    },
    photos: { yard: ritzPhoto, cafe, room },
    image: ritzPhoto,
  },
  {
    id: 'rixos-almaty',
    name: 'Rixos Almaty',
    location: 'Алматы, центр',
    address: 'проспект Сейфуллина, 506/99',
    price: '95 000 ₸ / ночь',
    rating: '4.8',
    description: 'Большой городской отель рядом с парком, театрами и центральными улицами Алматы.',
    details: {
      yard: 'Зеленая территория и удобный подъезд',
      cafe: 'Рестораны, бар и завтраки',
      rooms: 'Стандартные номера, премиум и люксы',
    },
    photos: { yard: rixosPhoto, cafe, room },
    image: rixosPhoto,
  },
  {
    id: 'intercontinental-almaty',
    name: 'InterContinental Almaty',
    location: 'Алматы, площадь Республики',
    address: 'улица Желтоксан, 181',
    price: '110 000 ₸ / ночь',
    rating: '4.8',
    description: 'Отель международной сети рядом с площадью Республики, бизнес-центрами и парками.',
    details: {
      yard: 'Спокойная территория около центра города',
      cafe: 'Atrium Lounge, ресторан и завтраки',
      rooms: 'Classic, Premium и Club InterContinental',
    },
    photos: { yard: intercontinentalPhoto, cafe, room },
    image: intercontinentalPhoto,
  },
  {
    id: 'novotel-almaty-city-center',
    name: 'Novotel Almaty City Center',
    location: 'Алматы, район Достык',
    address: 'проспект Достык, 104А',
    price: '70 000 ₸ / ночь',
    rating: '4.6',
    description: 'Современный отель в центре, рядом с метро Абай, Дворцом Республики и Kok Tobe.',
    details: {
      yard: 'Центральная локация для прогулок',
      cafe: 'Ресторан, бар и завтраки',
      rooms: 'Стандартные номера и люксы',
    },
    photos: { yard: novotelPhoto, cafe, room },
    image: novotelPhoto,
  },
  {
    id: 'kazakhstan-hotel',
    name: 'Hotel Kazakhstan',
    location: 'Алматы, центр',
    address: 'проспект Достык, 52/2',
    price: '38 000 ₸ / ночь',
    rating: '4.5',
    description: 'Легендарная высотка Алматы с панорамными видами и удобным расположением в центре.',
    details: {
      yard: 'Рядом прогулочные улицы и рестораны',
      cafe: 'Рестораны, кофейня и завтраки',
      rooms: 'Стандартные номера, superior и люксы',
    },
    photos: { yard: kazakhstanPhoto, cafe, room },
    image: kazakhstanPhoto,
  },
  {
    id: 'holiday-inn-almaty',
    name: 'Holiday Inn Almaty',
    location: 'Алматы, рядом с площадью Республики',
    address: 'улица Тимирязева, 2Д',
    price: '55 000 ₸ / ночь',
    rating: '4.4',
    description: 'Удобный сетевой отель для поездок, встреч и коротких остановок в центре Алматы.',
    details: {
      yard: 'Парковка и быстрый доступ к центру',
      cafe: 'Ресторан и круглосуточный бар',
      rooms: 'Standard, Premium и люксы',
    },
    photos: { yard: holidayInnPhoto, cafe, room },
    image: holidayInnPhoto,
  },
  {
    id: 'aman-hotel',
    name: 'Aman Hotel',
    location: 'Алматы, центр',
    address: 'улица Аман, 12',
    price: '32 000 ₸ / ночь',
    rating: '4.6',
    description: 'Уютный городской отель для спокойной поездки, прогулок по центру и коротких остановок.',
    details: {
      yard: 'Тихий двор и удобный вход рядом с городскими улицами',
      cafe: 'Небольшое кафе, завтраки и напитки для гостей',
      rooms: 'Стандартные номера, семейные комнаты и улучшенные номера',
    },
    photos: { yard: amanPhoto, cafe, room },
    image: amanPhoto,
  },
  {
    id: 'st-regis-astana',
    name: 'The St. Regis Astana',
    location: 'Астана, центр',
    address: 'проспект Кабанбай Батыра, 1',
    price: '155 000 ₸ / ночь',
    rating: '4.9',
    description: 'Роскошный отель у набережной Ишима с ресторанами, spa и сервисом St. Regis.',
    details: {
      yard: 'Вид на реку Ишим и прогулочную зону',
      cafe: 'La Riviere, St. Regis Bar и завтраки',
      rooms: 'Deluxe, Astor Suite и St. Regis Suite',
    },
    photos: { yard: stRegisAstanaPhoto, cafe, room },
    image: stRegisAstanaPhoto,
  },
  {
    id: 'hilton-astana',
    name: 'Hilton Astana',
    location: 'Астана, район EXPO',
    address: 'улица Сауран, 46',
    price: '85 000 ₸ / ночь',
    rating: '4.7',
    description: 'Современный отель рядом с EXPO, MEGA Silk Way и деловым районом столицы.',
    details: {
      yard: 'Просторная территория рядом с EXPO',
      cafe: 'Park Kitchen, Axis Lounge и бар Cloud 9',
      rooms: 'Guest Rooms, Executive Rooms и люксы',
    },
    photos: { yard: hiltonAstanaPhoto, cafe, room },
    image: hiltonAstanaPhoto,
  },
  {
    id: 'doubletree-shymkent',
    name: 'DoubleTree by Hilton Shymkent',
    location: 'Шымкент, центр',
    address: 'проспект Бауыржана Момышулы, 43',
    price: '42 000 ₸ / ночь',
    rating: '4.6',
    description: 'Сетевой отель в центре Шымкента рядом с городскими парками и торговыми местами.',
    details: {
      yard: 'Удобный подъезд и центральная локация',
      cafe: 'Ресторан, бар и завтраки',
      rooms: 'Guest Rooms, Suites и семейные номера',
    },
    photos: { yard: doubleTreeShymkentPhoto, cafe, room },
    image: doubleTreeShymkentPhoto,
  },
  {
    id: 'rixos-water-world-aktau',
    name: 'Rixos Water World Aktau',
    location: 'Актау, побережье Каспия',
    address: 'Warm Beach, 34',
    price: '120 000 ₸ / ночь',
    rating: '4.8',
    description: 'Курортный отель на побережье Каспийского моря с бассейнами и аквапарком.',
    details: {
      yard: 'Пляжная зона, бассейны и аквапарк',
      cafe: 'Рестораны all inclusive и бары',
      rooms: 'Номера с видом на море и семейные номера',
    },
    photos: { yard: rixosAktauPhoto, cafe, room },
    image: rixosAktauPhoto,
  },
  {
    id: 'hampton-turkistan',
    name: 'Hampton by Hilton Turkistan',
    location: 'Туркестан, центр',
    address: 'улица Жолбарыс Хана, 6А',
    price: '36 000 ₸ / ночь',
    rating: '4.5',
    description: 'Отель рядом с туристическим центром и мавзолеем Ходжи Ахмеда Ясави.',
    details: {
      yard: 'Локация для прогулок по историческому центру',
      cafe: 'Завтраки Hampton и бар',
      rooms: 'Standard Rooms и номера для семьи',
    },
    photos: { yard: hiltonAstanaPhoto, cafe, room },
    image: hiltonAstanaPhoto,
  },
  {
    id: 'the-plaza-new-york',
    name: 'The Plaza, New York',
    location: 'New York, USA',
    address: '768 Fifth Avenue, New York, NY 10019',
    price: '420 000 ₸ / ночь',
    rating: '4.8',
    description: 'Легендарный отель у Central Park и Fifth Avenue, один из символов Нью-Йорка.',
    details: {
      yard: 'Рядом Central Park, магазины и музеи Манхэттена',
      cafe: 'The Palm Court, Champagne Bar и завтраки',
      rooms: 'Deluxe Rooms, Grand Luxe и люксы',
    },
    photos: { yard: plazaNewYorkPhoto, cafe, room },
    image: plazaNewYorkPhoto,
  },
  {
    id: 'the-savoy-london',
    name: 'The Savoy',
    location: 'London, United Kingdom',
    address: 'Strand, London WC2R 0EZ',
    price: '390 000 ₸ / ночь',
    rating: '4.8',
    description: 'Исторический лондонский отель рядом с Covent Garden, Trafalgar Square и Темзой.',
    details: {
      yard: 'Классический въезд Savoy Court в центре Лондона',
      cafe: 'Thames Foyer, American Bar и рестораны',
      rooms: 'Luxury Rooms, River View и Signature Suites',
    },
    photos: { yard: savoyLondonPhoto, cafe, room },
    image: savoyLondonPhoto,
  },
  {
    id: 'ritz-paris',
    name: 'Ritz Paris',
    location: 'Paris, France',
    address: '15 Place Vendome, 75001 Paris',
    price: '650 000 ₸ / ночь',
    rating: '4.9',
    description: 'Знаковый парижский отель на Place Vendome рядом с Louvre и Opera Garnier.',
    details: {
      yard: 'Исторический фасад и тихие внутренние пространства',
      cafe: 'Bar Hemingway, L Espadon и завтраки',
      rooms: 'Superior Rooms, Grand Deluxe и Prestige Suites',
    },
    photos: { yard: ritzParisPhoto, cafe, room },
    image: ritzParisPhoto,
  },
  {
    id: 'burj-al-arab-dubai',
    name: 'Jumeirah Burj Al Arab',
    location: 'Dubai, United Arab Emirates',
    address: 'Jumeirah Beach Road, Dubai',
    price: '780 000 ₸ / ночь',
    rating: '4.9',
    description: 'Знаменитый отель-парус на отдельном острове у побережья Дубая.',
    details: {
      yard: 'Частный мост, пляж и вид на Персидский залив',
      cafe: 'Фирменные рестораны Jumeirah и лаунжи',
      rooms: 'Duplex Suites, Sky Suites и Royal Suite',
    },
    photos: { yard: burjAlArabPhoto, cafe, room },
    image: burjAlArabPhoto,
  },
  {
    id: 'mandarin-oriental-tokyo',
    name: 'Mandarin Oriental, Tokyo',
    location: 'Tokyo, Japan',
    address: '2-1-1 Nihonbashi Muromachi, Chuo-ku, Tokyo 103-8328',
    price: '330 000 ₸ / ночь',
    rating: '4.8',
    description: 'Высотный отель в Nihonbashi с видами на Tokyo Skytree, Ginza и Mount Fuji.',
    details: {
      yard: 'Прямой доступ к району Nihonbashi и метро',
      cafe: 'Рестораны высокой кухни, лаунж и завтраки',
      rooms: 'Mandarin Rooms, Premier Rooms и Suites',
    },
    photos: { yard: mandarinTokyoPhoto, cafe, room },
    image: mandarinTokyoPhoto,
  },
  {
    id: 'marina-bay-sands-singapore',
    name: 'Marina Bay Sands',
    location: 'Singapore',
    address: '10 Bayfront Avenue, Singapore 018956',
    price: '360 000 ₸ / ночь',
    rating: '4.7',
    description: 'Иконический комплекс у Marina Bay с тремя башнями и SkyPark на крыше.',
    details: {
      yard: 'Набережная Marina Bay и сады Gardens by the Bay',
      cafe: 'Рестораны, фуд-холлы и бары SkyPark',
      rooms: 'Deluxe Rooms, Sands Premier и Suites',
    },
    photos: { yard: marinaBaySandsPhoto, cafe, room },
    image: marinaBaySandsPhoto,
  },
  {
    id: 'four-seasons-istanbul-sultanahmet',
    name: 'Four Seasons Hotel Istanbul at Sultanahmet',
    location: 'Istanbul, Turkiye',
    address: 'Tevkifhane Sokak No. 1, Sultanahmet-Eminonu, Istanbul',
    price: '310 000 ₸ / ночь',
    rating: '4.9',
    description: 'Отель в историческом Sultanahmet рядом с Hagia Sophia, Blue Mosque и Topkapi.',
    details: {
      yard: 'Внутренний двор и вид на исторический район',
      cafe: 'AVLU Restaurant, лаунж и завтраки',
      rooms: 'Superior Rooms, Premier Rooms и Suites',
    },
    photos: { yard: fourSeasonsIstanbulPhoto, cafe, room },
    image: fourSeasonsIstanbulPhoto,
  },
  {
    id: 'park-hyatt-sydney',
    name: 'Park Hyatt Sydney',
    location: 'Sydney, Australia',
    address: '7 Hickson Road, The Rocks, Sydney NSW 2000',
    price: '430 000 ₸ / ночь',
    rating: '4.8',
    description: 'Отель на набережной Sydney Harbour с видом на Opera House и Harbour Bridge.',
    details: {
      yard: 'Променад The Rocks и вид на гавань',
      cafe: 'The Dining Room и бары у воды',
      rooms: 'Opera View Rooms, Harbour View и люксы',
    },
    photos: { yard: parkHyattSydneyPhoto, cafe, room },
    image: parkHyattSydneyPhoto,
  },
];
