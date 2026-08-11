import { FormEvent, useState } from 'react';
import { Link } from 'wouter';
import { services } from '../data/services';

type Booking = {
  id: number;
  name: string;
  service: string;
  date: string;
  time: string;
};

export function BookingPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [message, setMessage] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const booking = {
      id: Date.now(),
      name: String(form.get('name')),
      service: String(form.get('service')),
      date: String(form.get('date')),
      time: String(form.get('time')),
    };

    setBookings((current) => [booking, ...current]);
    setMessage('Готово! Бронь добавлена в список.');
    event.currentTarget.reset();
  }

  return (
    <main className="page">
      <header className="topbar">
        <Link href="/">BookEasy</Link>
        <Link className="topbar__link" href="/">
          На главную
        </Link>
      </header>

      <section className="booking-layout">
        <form className="booking-form" onSubmit={handleSubmit}>
          <div>
            <p className="eyebrow">Новая бронь</p>
            <h1>Выбери удобное время</h1>
          </div>

          <label>
            Имя
            <input name="name" placeholder="Например, Айдана" required />
          </label>

          <label>
            Услуга
            <select name="service" required>
              {services.map((service) => (
                <option key={service.id} value={service.title}>
                  {service.title}
                </option>
              ))}
            </select>
          </label>

          <div className="form-columns">
            <label>
              Дата
              <input name="date" type="date" required />
            </label>
            <label>
              Время
              <input name="time" type="time" required />
            </label>
          </div>

          <button type="submit">Создать бронь</button>
          {message && <p className="message">{message}</p>}
        </form>

        <aside className="booking-list">
          <h2>Мои брони</h2>
          {bookings.length === 0 ? (
            <p className="empty">Пока записей нет.</p>
          ) : (
            <ul>
              {bookings.map((booking) => (
                <li key={booking.id}>
                  <strong>{booking.service}</strong>
                  <span>
                    {booking.date}, {booking.time} - {booking.name}
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
