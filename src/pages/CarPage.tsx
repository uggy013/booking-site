import { Link, useRoute } from 'wouter';
import { cars } from '../data/cars';
import { addCarToCart } from '../lib/cart';
import { getCarBodyType, getCarPrice, getCarReviews } from '../lib/carExtras';

export function CarPage() {
  const [, params] = useRoute('/cars/:id');
  const car = cars.find((item) => item.id === params?.id);

  if (!car) {
    return (
      <main className="page not-found">
        <h1>Машина не найдена</h1>
        <Link className="button" href="/cars">
          К машинам
        </Link>
      </main>
    );
  }

  return (
    <main className="page">
      <header className="topbar">
        <Link href="/">easybook</Link>
        <Link className="topbar__link" href="/cars">
          К машинам
        </Link>
      </header>

      <section className="car-detail">
        <img src={car.image} alt={car.model} />
        <div>
          <p className="eyebrow">{car.city}</p>
          <h1>{car.model}</h1>
          <p>{car.description}</p>
          <div className="car-detail__specs">
            <span>{getCarBodyType(car)}</span>
            <span>{car.year}</span>
            <span>{car.seats} мест</span>
            <span>{car.transmission}</span>
            <span>{car.luggage}</span>
            <span>{car.fuelUse}</span>
            <span>{car.engine}</span>
            <span>{car.drive}</span>
            <span>Депозит: {car.deposit}</span>
            <span>{getCarPrice(car).toLocaleString('ru-RU')} KZT/день</span>
          </div>
          <div className="hotel-detail__actions">
            <Link className="button" href={`/cars?car=${encodeURIComponent(car.id)}`}>
              Арендовать
            </Link>
            <button type="button" onClick={() => addCarToCart(car)}>
              В корзину
            </button>
            <a className="button button--light" href={car.offerUrl} target="_blank" rel="noreferrer">
              Открыть источник
            </a>
          </div>
        </div>
      </section>

      <section className="hotel-detail__grid">
        <div>
          <h2>Условия аренды</h2>
          <p className="empty">Паспорт или ID, водительские права, депозит и подтверждение условий топлива.</p>
        </div>
        <div>
          <h2>Отзывы</h2>
          <ul className="hotel-detail__reviews">
            {getCarReviews(car).map((review) => (
              <li key={review}>{review}</li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
