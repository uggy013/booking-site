import type { CarClass, RentalCar } from '../data/cars';

type CarCardProps = {
  car: RentalCar;
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

export function CarCard({ car, onPick }: CarCardProps) {
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
            <span>{car.seats} мест</span>
            <span>{car.transmission}</span>
          </div>
        </div>
        <div className="car-card__meta">
          <strong>{car.price}</strong>
          <div className="car-card__actions">
            <button type="button" onClick={() => onPick(car)}>
              Выбрать
            </button>
            <a className="button button--light" href={car.offerUrl} target="_blank" rel="noreferrer">
              Открыть
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
