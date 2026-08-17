import { Link } from 'wouter';
import type { CarClass, RentalCar } from '../data/cars';
import { addCarToCart } from '../lib/cart';
import { getCarBodyType } from '../lib/carExtras';

type CarCardProps = {
  car: RentalCar;
  isFavorite: boolean;
  isCompared: boolean;
  onFavoriteToggle: (carId: string) => void;
  onCompareToggle: (carId: string) => void;
  onPick: (car: RentalCar) => void;
};

const classLabels: Record<CarClass, string> = {
  economy: 'Эконом',
  comfort: 'Комфорт',
  premium: 'Премиум',
  suv: 'Кроссовер',
};

const fallbackCarImage =
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80';

export function CarCard({
  car,
  isFavorite,
  isCompared,
  onCompareToggle,
  onFavoriteToggle,
  onPick,
}: CarCardProps) {
  return (
    <article className="car-card">
      <img
        src={car.image}
        alt={car.model}
        referrerPolicy="no-referrer"
        onError={(event) => {
          event.currentTarget.src = fallbackCarImage;
        }}
      />
      <div className="car-card__body">
        <div>
          <span className="car-card__badge">{classLabels[car.carClass]}</span>
          <h3>{car.model}</h3>
          <p>{car.city}</p>
          <p>{car.description}</p>
          <p className="car-card__source">Источник: {car.source}</p>
          <div className="car-card__specs">
            <span>{getCarBodyType(car)}</span>
            <span>{car.year}</span>
            <span>{car.seats} мест</span>
            <span>{car.transmission}</span>
          </div>
          <div className="car-card__specs car-card__specs--dense">
            <span>{car.luggage}</span>
            <span>{car.fuelUse}</span>
            <span>{car.drive}</span>
          </div>
        </div>
        <div className="car-card__meta">
          <strong>{car.price}</strong>
          <div className="car-card__actions">
            <button type="button" onClick={() => onPick(car)}>
              Выбрать
            </button>
            <button type="button" onClick={() => onFavoriteToggle(car.id)}>
              {isFavorite ? 'Сохранено' : 'Сохранить'}
            </button>
            <button type="button" onClick={() => onCompareToggle(car.id)}>
              {isCompared ? 'Добавлено' : 'Сравнить'}
            </button>
            <Link className="button button--light" href={`/cars/${car.id}`}>
              Подробнее
            </Link>
            <button type="button" onClick={() => addCarToCart(car)}>
              В корзину
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
