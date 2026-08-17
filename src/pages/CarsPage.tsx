import { FormEvent, useMemo, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { CartLink } from '../components/CartLink';
import { CarCard } from '../components/CarCard';
import { CarClass, RentalCar, cars } from '../data/cars';
import {
  CarBodyType,
  CarExtra,
  CarSortMode,
  PickupPlace,
  carBodyTypes,
  carExtras,
  getCarBodyType,
  getCarPrice,
  getRentalDays,
  pickupPlaces,
  sortCars,
} from '../lib/carExtras';

type CarClassFilter = CarClass | 'all';
type PriceFilter = 'all' | '15000' | '25000' | '40000' | '80000';
type TransmissionFilter = 'all' | 'automatic' | 'manual';
type FavoriteFilter = 'all' | 'favorites';

const cities = Array.from(new Set(cars.map((car) => car.city)));

export function CarsPage() {
  const [location] = useLocation();
  const selectedCarId = new URLSearchParams(location.split('?')[1] ?? '').get('car');
  const [query, setQuery] = useState('');
  const [city, setCity] = useState('all');
  const [carClass, setCarClass] = useState<CarClassFilter>('all');
  const [bodyType, setBodyType] = useState<CarBodyType | 'all'>('all');
  const [transmission, setTransmission] = useState<TransmissionFilter>('all');
  const [price, setPrice] = useState<PriceFilter>('all');
  const [sort, setSort] = useState<CarSortMode>('recommended');
  const [favoriteFilter, setFavoriteFilter] = useState<FavoriteFilter>('all');
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    const saved = window.localStorage.getItem('favoriteCars');
    return saved ? (JSON.parse(saved) as string[]) : [];
  });
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [selectedCar, setSelectedCar] = useState<RentalCar>(
    cars.find((car) => car.id === selectedCarId) ?? cars[0],
  );
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [pickupPlace, setPickupPlace] = useState<PickupPlace>('airport');
  const [selectedExtras, setSelectedExtras] = useState<CarExtra[]>([]);
  const [message, setMessage] = useState('');
  const normalizedQuery = query.trim().toLowerCase();

  const filteredCars = useMemo(() => {
    const matches = cars.filter((car) => {
      const searchText = [car.model, car.city, car.description, car.source].join(' ').toLowerCase();
      const matchesQuery = !normalizedQuery || searchText.includes(normalizedQuery);
      const matchesCity = city === 'all' || car.city === city;
      const matchesClass = carClass === 'all' || car.carClass === carClass;
      const matchesBody = bodyType === 'all' || getCarBodyType(car) === bodyType;
      const matchesTransmission =
        transmission === 'all' ||
        car.transmission.toLowerCase().includes(transmission === 'automatic' ? 'автомат' : 'механ');
      const matchesPrice = price === 'all' || getCarPrice(car) <= Number(price);
      const matchesFavorite = favoriteFilter === 'all' || favoriteIds.includes(car.id);

      return (
        matchesQuery &&
        matchesCity &&
        matchesClass &&
        matchesBody &&
        matchesTransmission &&
        matchesPrice &&
        matchesFavorite
      );
    });

    return sortCars(matches, sort);
  }, [bodyType, carClass, city, favoriteFilter, favoriteIds, normalizedQuery, price, sort, transmission]);

  const compareCars = cars.filter((car) => compareIds.includes(car.id));
  const days = getRentalDays(startDate, endDate);
  const extrasTotal = selectedExtras.reduce(
    (total, extraId) => total + (carExtras.find((extra) => extra.id === extraId)?.price ?? 0),
    0,
  );
  const totalPrice = (getCarPrice(selectedCar) + extrasTotal) * days;

  function toggleFavorite(carId: string) {
    setFavoriteIds((current) => {
      const next = current.includes(carId) ? current.filter((id) => id !== carId) : [...current, carId];
      window.localStorage.setItem('favoriteCars', JSON.stringify(next));
      return next;
    });
  }

  function toggleCompare(carId: string) {
    setCompareIds((current) => {
      if (current.includes(carId)) {
        return current.filter((id) => id !== carId);
      }

      return current.length >= 3 ? current : [...current, carId];
    });
  }

  function toggleExtra(extraId: CarExtra) {
    setSelectedExtras((current) =>
      current.includes(extraId) ? current.filter((id) => id !== extraId) : [...current, extraId],
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(`Заявка отправлена: ${selectedCar.model}. Итого: ${totalPrice.toLocaleString('ru-RU')} KZT.`);
  }

  return (
    <main className="page">
      <header className="topbar">
        <Link href="/">easybook</Link>
        <nav className="topbar__actions">
          <CartLink />
          <Link className="topbar__link" href="/">
            На главную
          </Link>
        </nav>
      </header>

      <section className="cars-hero">
        <div>
          <p className="eyebrow">Аренда авто</p>
          <h1>Найди машину для поездки</h1>
          <p>Фильтруй по городу, классу, кузову, цене, коробке передач и месту получения.</p>
        </div>
      </section>

      <section className="car-filters" aria-label="Фильтры машин">
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
          <select value={carClass} onChange={(event) => setCarClass(event.target.value as CarClassFilter)}>
            <option value="all">Все классы</option>
            <option value="economy">Эконом</option>
            <option value="comfort">Комфорт</option>
            <option value="premium">Премиум</option>
            <option value="suv">Кроссовер</option>
          </select>
        </label>
        <label>
          Кузов
          <select value={bodyType} onChange={(event) => setBodyType(event.target.value as CarBodyType | 'all')}>
            <option value="all">Любой кузов</option>
            {carBodyTypes.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            ))}
          </select>
        </label>
        <label>
          Коробка
          <select
            value={transmission}
            onChange={(event) => setTransmission(event.target.value as TransmissionFilter)}
          >
            <option value="all">Любая</option>
            <option value="automatic">Автомат</option>
            <option value="manual">Механика</option>
          </select>
        </label>
        <label>
          Цена
          <select value={price} onChange={(event) => setPrice(event.target.value as PriceFilter)}>
            <option value="all">Любая</option>
            <option value="15000">15 000 KZT</option>
            <option value="25000">25 000 KZT</option>
            <option value="40000">40 000 KZT</option>
            <option value="80000">80 000 KZT</option>
          </select>
        </label>
        <label>
          Сортировка
          <select value={sort} onChange={(event) => setSort(event.target.value as CarSortMode)}>
            <option value="recommended">Рекомендованные</option>
            <option value="price-low">Сначала дешевле</option>
            <option value="price-high">Сначала дороже</option>
            <option value="seats">Больше мест</option>
          </select>
        </label>
        <label>
          Сохранённые
          <select
            value={favoriteFilter}
            onChange={(event) => setFavoriteFilter(event.target.value as FavoriteFilter)}
          >
            <option value="all">Все машины</option>
            <option value="favorites">Только сохранённые</option>
          </select>
        </label>
      </section>

      {compareCars.length > 0 && (
        <section className="compare-panel">
          <h2>Сравнение машин</h2>
          <div className="compare-grid">
            {compareCars.map((car) => (
              <div key={car.id}>
                <strong>{car.model}</strong>
                <span>{car.price}</span>
                <span>{car.year}</span>
                <span>{getCarBodyType(car)}</span>
                <span>{car.seats} мест</span>
                <span>{car.transmission}</span>
                <span>{car.luggage}</span>
                <span>{car.fuelUse}</span>
                <span>{car.drive}</span>
                <span>Депозит: {car.deposit}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="cars-layout">
        <div className="cars-grid">
          {filteredCars.length === 0 ? (
            <p className="empty">Пока нет машин под такие фильтры.</p>
          ) : (
            filteredCars.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                isCompared={compareIds.includes(car.id)}
                isFavorite={favoriteIds.includes(car.id)}
                onCompareToggle={toggleCompare}
                onFavoriteToggle={toggleFavorite}
                onPick={setSelectedCar}
              />
            ))
          )}
        </div>

        <form className="booking-form" onSubmit={handleSubmit}>
          <div>
            <p className="eyebrow">Заявка на аренду</p>
            <h1>{selectedCar.model}</h1>
          </div>
          <label>
            Имя
            <input name="name" placeholder="Айдан" required />
          </label>
          <label>
            Телефон
            <input name="phone" placeholder="+7 777 123 45 67" required />
          </label>
          <div className="form-columns">
            <label>
              Начало
              <input name="startDate" type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} required />
            </label>
            <label>
              Конец
              <input name="endDate" type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} required />
            </label>
          </div>
          <label>
            Место получения
            <select value={pickupPlace} onChange={(event) => setPickupPlace(event.target.value as PickupPlace)}>
              {pickupPlaces.map((place) => (
                <option key={place.id} value={place.id}>
                  {place.title}
                </option>
              ))}
            </select>
          </label>
          <div className="extras-list">
            {carExtras.map((extra) => (
              <label key={extra.id}>
                <input
                  checked={selectedExtras.includes(extra.id)}
                  type="checkbox"
                  onChange={() => toggleExtra(extra.id)}
                />
                {extra.title} + {extra.price.toLocaleString('ru-RU')} KZT/день
              </label>
            ))}
          </div>
          <aside className="rental-summary">
            <strong>Итого</strong>
            <span>{days} дн.</span>
            <span>{pickupPlaces.find((place) => place.id === pickupPlace)?.title}</span>
            <b>{totalPrice.toLocaleString('ru-RU')} KZT</b>
          </aside>
          <button type="submit">Отправить заявку</button>
          {message && <p className="message">{message}</p>}
        </form>
      </section>
    </main>
  );
}
