import { FormEvent, useMemo, useState } from 'react';
import { Link } from 'wouter';
import { CarCard } from '../components/CarCard';
import { CarClass, RentalCar, cars } from '../data/cars';

type CarClassFilter = CarClass | 'all';
type PriceFilter = 'all' | '35000' | '55000' | '80000';

const cities = Array.from(new Set(cars.map((car) => car.city)));
const getPrice = (price: string) => Number(price.replace(/\D/g, ''));

export function CarsPage() {
  const [query, setQuery] = useState('');
  const [city, setCity] = useState('all');
  const [carClass, setCarClass] = useState<CarClassFilter>('all');
  const [price, setPrice] = useState<PriceFilter>('all');
  const [selectedCar, setSelectedCar] = useState<RentalCar>(cars[0]);
  const [message, setMessage] = useState('');
  const normalizedQuery = query.trim().toLowerCase();

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const searchText = [car.model, car.city, car.description, car.source].join(' ').toLowerCase();
      const matchesQuery = !normalizedQuery || searchText.includes(normalizedQuery);
      const matchesCity = city === 'all' || car.city === city;
      const matchesClass = carClass === 'all' || car.carClass === carClass;
      const matchesPrice = price === 'all' || getPrice(car.price) <= Number(price);
      return matchesQuery && matchesCity && matchesClass && matchesPrice;
    });
  }, [carClass, city, normalizedQuery, price]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(`Готово! Заявка на ${selectedCar.model} отправлена.`);
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

      <section className="cars-hero">
        <div>
          <p className="eyebrow">Аренда авто</p>
          <h1>Реальные предложения в Казахстане</h1>
          <p>Ищи машину по модели, городу или сервису: Rentacars.kz, GetRentacar, Skyscanner.</p>
        </div>
      </section>

      <section className="car-filters" aria-label="Фильтры авто">
        <label>
          Поиск
          <input
            type="search"
            placeholder="Accent, Camry, Kia, Rentacars"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <label>
          Город
          <select value={city} onChange={(event) => setCity(event.target.value)}>
            <option value="all">Все города</option>
            {cities.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label>
          Класс
          <select
            value={carClass}
            onChange={(event) => setCarClass(event.target.value as CarClassFilter)}
          >
            <option value="all">Все классы</option>
            <option value="economy">Эконом</option>
            <option value="comfort">Комфорт</option>
            <option value="premium">Премиум</option>
            <option value="suv">Кроссовер</option>
          </select>
        </label>
        <label>
          Цена до
          <select value={price} onChange={(event) => setPrice(event.target.value as PriceFilter)}>
            <option value="all">Любая</option>
            <option value="35000">35 000 ₸</option>
            <option value="55000">55 000 ₸</option>
            <option value="80000">80 000 ₸</option>
          </select>
        </label>
      </section>

      <section className="cars-layout">
        <div className="cars-grid">
          {filteredCars.length === 0 ? (
            <p className="empty">По таким фильтрам предложений пока нет.</p>
          ) : (
            filteredCars.map((car) => <CarCard key={car.id} car={car} onPick={setSelectedCar} />)
          )}
        </div>

        <form className="booking-form" onSubmit={handleSubmit}>
          <div>
            <p className="eyebrow">Заявка</p>
            <h1>{selectedCar.model}</h1>
          </div>
          <label>
            Имя
            <input name="name" placeholder="Например, Айдана" required />
          </label>
          <label>
            Телефон
            <input name="phone" placeholder="+7 777 123 45 67" required />
          </label>
          <div className="form-columns">
            <label>
              Начало
              <input name="startDate" type="date" required />
            </label>
            <label>
              Конец
              <input name="endDate" type="date" required />
            </label>
          </div>
          <button type="submit">Отправить заявку</button>
          {message && <p className="message">{message}</p>}
        </form>
      </section>
    </main>
  );
}
