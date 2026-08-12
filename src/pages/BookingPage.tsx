import { FormEvent, useState } from 'react';
import { Link } from 'wouter';
import { hotels } from '../data/hotels';

type HotelBooking = {
  id: number;
  guestName: string;
  phone: string;
  hotel: string;
  roomTitle: string;
  roomSize: string;
  guests: string;
  checkIn: string;
  checkOut: string;
};

const roomTypes = [
  { id: 'standard', title: 'Стандарт', size: '22 м²' },
  { id: 'comfort', title: 'Комфорт', size: '30 м²' },
  { id: 'suite', title: 'Люкс', size: '45 м²' },
  { id: 'family', title: 'Семейный номер', size: '55 м²' },
];

export function BookingPage() {
  const [bookings, setBookings] = useState<HotelBooking[]>([]);
  const [message, setMessage] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const roomId = String(form.get('roomType'));
    const room = roomTypes.find((item) => item.id === roomId) ?? roomTypes[0];
    const booking = {
      id: Date.now(),
      guestName: String(form.get('guestName')),
      phone: String(form.get('phone')),
      hotel: String(form.get('hotel')),
      roomTitle: room.title,
      roomSize: room.size,
      guests: String(form.get('guests')),
      checkIn: String(form.get('checkIn')),
      checkOut: String(form.get('checkOut')),
    };

    setBookings((current) => [booking, ...current]);
    setMessage('Готово! Бронь отеля добавлена в список.');
    event.currentTarget.reset();
  }

  return (
    <main className="page">
      <header className="topbar">
        <Link href="/">easybook</Link>
        <Link className="topbar__link" href="/">
          На главную
        </Link>
      </header>

      <section className="booking-layout">
        <form className="booking-form" onSubmit={handleSubmit}>
          <div>
            <p className="eyebrow">Бронирование отеля</p>
            <h1>Выбери номер и даты</h1>
          </div>

          <label>
            Имя гостя
            <input name="guestName" placeholder="Например, Айдана" required />
          </label>

          <label>
            Телефон
            <input name="phone" placeholder="+7 777 123 45 67" required />
          </label>

          <label>
            Отель
            <select name="hotel" required>
              {hotels.map((hotel) => (
                <option key={hotel.id} value={hotel.name}>
                  {hotel.name} - {hotel.location}
                </option>
              ))}
            </select>
          </label>

          <div className="form-columns">
            <label>
              Тип номера
              <select name="roomType" required>
                {roomTypes.map((roomType) => (
                  <option key={roomType.id} value={roomType.id}>
                    {roomType.title} - {roomType.size}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Гостей
              <input name="guests" type="number" min="1" max="8" defaultValue="2" required />
            </label>
          </div>

          <div className="form-columns">
            <label>
              Заезд
              <input name="checkIn" type="date" required />
            </label>
            <label>
              Выезд
              <input name="checkOut" type="date" required />
            </label>
          </div>

          <button type="submit">Забронировать номер</button>
          {message && <p className="message">{message}</p>}
        </form>

        <aside className="booking-list">
          <h2>Мои брони</h2>
          {bookings.length === 0 ? (
            <p className="empty">Пока бронирований нет.</p>
          ) : (
            <ul>
              {bookings.map((booking) => (
                <li key={booking.id}>
                  <strong>{booking.hotel}</strong>
                  <span>
                    {booking.checkIn} - {booking.checkOut}, {booking.roomTitle}
                  </span>
                  <span>
                    Площадь: {booking.roomSize}, гостей: {booking.guests}
                  </span>
                  <span>
                    {booking.guestName}, {booking.phone}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </section>
    </main>
  );
}
