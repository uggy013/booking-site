export type CarClass = 'economy' | 'comfort' | 'premium' | 'suv';

export type RentalCar = {
  id: string;
  model: string;
  city: string;
  carClass: CarClass;
  seats: number;
  transmission: string;
  price: string;
  description: string;
  image: string;
  source: string;
  offerUrl: string;
};

export const cars: RentalCar[] = [
  {
    id: 'hyundai-accent-rentacars-almaty',
    model: 'Hyundai Accent',
    city: 'Алматы',
    carClass: 'economy',
    seats: 5,
    transmission: 'автомат',
    price: '24 000 ₸ / день',
    description: 'Реальное предложение Rentacars.kz: Hyundai Accent, 5 мест, 2022 год.',
    image:
      'https://rentacars.kz/files_dynamic/client/userfls/images/01c5740ee8/1/82bf9d/1918_hyundai-accent-gray-3.png',
    source: 'Rentacars.kz',
    offerUrl: 'https://rentacars.kz/en/hyundai-accent-gray/',
  },
  {
    id: 'toyota-camry-getrentacar-almaty',
    model: 'Toyota Camry',
    city: 'Алматы',
    carClass: 'comfort',
    seats: 5,
    transmission: 'автомат',
    price: 'от $60 / день',
    description: 'На GetRentacar в Алматы встречаются предложения Toyota Camry 2014/2019/2020.',
    image: 'https://img.ltn.com.tw/Upload/auto/page/2024/05/14/240514-25657-1-u8XQk.png',
    source: 'GetRentacar',
    offerUrl: 'https://getrentacar.com/en-US/kazakhstan/almaty',
  },
  {
    id: 'mg-6-rentacars-almaty',
    model: 'MG 6',
    city: 'Алматы',
    carClass: 'comfort',
    seats: 5,
    transmission: 'автомат',
    price: '35 000 ₸ / день',
    description: 'Реальное предложение Rentacars.kz: MG 6, 5 мест, 2024 год.',
    image:
      'https://rentacars.kz/files_dynamic/client/userfls/images/01c5740ee8/3/e0b420/3160_mg6-belyy.png',
    source: 'Rentacars.kz',
    offerUrl: 'https://rentacars.kz/en/mg-6/',
  },
  {
    id: 'kia-cerato-rentacars-almaty',
    model: 'Kia Cerato',
    city: 'Алматы',
    carClass: 'comfort',
    seats: 5,
    transmission: 'автомат',
    price: '35 000 ₸ / день',
    description: 'Реальное предложение Rentacars.kz: Kia Cerato, 5 мест, 2022 год.',
    image:
      'https://rentacars.kz/files_dynamic/client/userfls/images/01c5740ee8/1/af6a5c/1592_12.png',
    source: 'Rentacars.kz',
    offerUrl: 'https://rentacars.kz/en/kia-cerato/',
  },
  {
    id: 'haval-h6-rentacars-almaty',
    model: 'Haval H6',
    city: 'Алматы',
    carClass: 'suv',
    seats: 5,
    transmission: 'автомат',
    price: '40 000 ₸ / день',
    description: 'Реальное предложение Rentacars.kz: Haval H6, 5 мест, 2024 год.',
    image:
      'https://rentacars.kz/files_dynamic/client/userfls/images/01c5740ee8/1/5e2a97/2525_img_5772.jpg',
    source: 'Rentacars.kz',
    offerUrl: 'https://rentacars.kz/en/haval-h6/',
  },
  {
    id: 'kia-k5-rentacars-almaty',
    model: 'Kia K5',
    city: 'Алматы',
    carClass: 'comfort',
    seats: 5,
    transmission: 'автомат',
    price: '40 000 ₸ / день',
    description: 'Реальное предложение Rentacars.kz: Kia K5, 5 мест, 2025 год.',
    image:
      'https://rentacars.kz/files_dynamic/client/userfls/images/01c5740ee8/1/2f8f2d/2592_k5-removebg-preview.png',
    source: 'Rentacars.kz',
    offerUrl: 'https://rentacars.kz/en/kia-k5-2025-black/',
  },
  {
    id: 'kia-sportage-rentacars-almaty',
    model: 'Kia Sportage',
    city: 'Алматы',
    carClass: 'suv',
    seats: 5,
    transmission: 'автомат',
    price: '45 000 ₸ / день',
    description: 'Реальное предложение Rentacars.kz: Kia Sportage, 5 мест, 2022/2025 год.',
    image: 'https://www.motortrend.com/uploads/2024/01/22-2024-Kia-Sportage-PHEV-front-view.jpg',
    source: 'Rentacars.kz',
    offerUrl: 'https://rentacars.kz/en/cars/',
  },
  {
    id: 'hyundai-tucson-rentacars-almaty',
    model: 'Hyundai Tucson',
    city: 'Алматы',
    carClass: 'suv',
    seats: 5,
    transmission: 'автомат',
    price: '45 000 ₸ / день',
    description: 'Реальное предложение Rentacars.kz и популярная модель в поиске Skyscanner.',
    image:
      'https://rentacars.kz/files_dynamic/client/userfls/images/01c5740ee8/3/f56d93/3001_canvas.png',
    source: 'Rentacars.kz / Skyscanner',
    offerUrl: 'https://rentacars.kz/en/hyundai-tucson-2025-gray/',
  },
  {
    id: 'kia-carnival-rentacars-almaty',
    model: 'Kia Carnival',
    city: 'Алматы',
    carClass: 'comfort',
    seats: 8,
    transmission: 'автомат',
    price: '55 000 ₸ / день',
    description: 'Реальное предложение Rentacars.kz: Kia Carnival, 8 мест, 2021 год.',
    image:
      'https://substackcdn.com/image/fetch/%24s_%21CKp6%21%2Cf_auto%2Cq_auto%3Agood%2Cfl_progressive%3Asteep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Fe00437e9-54f5-4f56-83e3-98d50b3f217a_1350x900.jpeg',
    source: 'Rentacars.kz',
    offerUrl: 'https://rentacars.kz/en/cars/',
  },
  {
    id: 'lexus-rx-rentacars-almaty',
    model: 'Lexus RX300 F SPORT',
    city: 'Алматы',
    carClass: 'premium',
    seats: 5,
    transmission: 'автомат',
    price: '55 000 ₸ / день',
    description: 'Реальное предложение Rentacars.kz: Lexus RX300 F SPORT, 2019 год.',
    image:
      'https://rentacars.kz/files_dynamic/client/userfls/images/01c5740ee8/1/d791d3/1791_dsc01609-1.jpg',
    source: 'Rentacars.kz',
    offerUrl: 'https://rentacars.kz/en/lexus-rx300-f-sport/',
  },
  {
    id: 'bmw-x5-getrentacar-almaty',
    model: 'BMW X5',
    city: 'Алматы',
    carClass: 'premium',
    seats: 5,
    transmission: 'автомат',
    price: 'от $161 / день',
    description: 'На GetRentacar в Алматы встречается BMW X5 2016.',
    image: 'https://img.motonews.pl/autoblog/photos/2018/06/BMW-X5-2018_16.jpg',
    source: 'GetRentacar',
    offerUrl: 'https://getrentacar.com/en-US/kazakhstan/almaty',
  },
  {
    id: 'toyota-land-cruiser-getrentacar-almaty',
    model: 'Toyota Land Cruiser',
    city: 'Алматы',
    carClass: 'suv',
    seats: 7,
    transmission: 'автомат',
    price: 'от $160 / день',
    description: 'Реальная страница GetRentacar: Toyota Land Cruiser 2020 в Алматы.',
    image: 'https://toyota.co.tz/wp-content/uploads/2022/03/LC-300_ZX_COL_040_RGB.png',
    source: 'GetRentacar',
    offerUrl: 'https://getrentacar.com/en-US/car-rental/5018231',
  },
];
