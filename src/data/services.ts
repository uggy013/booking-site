export type BookingService = {
  id: string;
  title: string;
  duration: string;
  price: string;
  description: string;
};

export const services: BookingService[] = [
  {
    id: 'consultation',
    title: 'Консультация',
    duration: '45 минут',
    price: '5 000 ₸',
    description: 'Разберем задачу, составим план и выберем следующий шаг.',
  },
  {
    id: 'lesson',
    title: 'Индивидуальный урок',
    duration: '60 минут',
    price: '7 500 ₸',
    description: 'Персональное занятие по твоему уровню и цели.',
  },
  {
    id: 'practice',
    title: 'Практическая сессия',
    duration: '90 минут',
    price: '10 000 ₸',
    description: 'Много практики, обратная связь и готовый результат.',
  },
];
