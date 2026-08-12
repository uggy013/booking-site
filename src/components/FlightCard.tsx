import type { FlightClass, FlightDeal } from '../data/flights';

type FlightCardProps = {
  flight: FlightDeal;
};

const classLabels: Record<FlightClass, string> = {
  economy: 'Эконом',
  comfort: 'Комфорт',
  business: 'Бизнес',
};

export function FlightCard({ flight }: FlightCardProps) {
  return (
    <article className="flight-card">
      <div>
        <span className="flight-card__badge">{classLabels[flight.flightClass]}</span>
        <span>{flight.airline}</span>
        <h3>{flight.route}</h3>
        <p>{flight.dates}</p>
        <p className="flight-card__hotel">
          Отель: {flight.hotelName}, {flight.hotelArea}
        </p>
        <p className="flight-card__perks">{flight.perks}</p>
      </div>
      <div className="flight-card__meta">
        <span>{flight.duration}</span>
        <strong>{flight.price}</strong>
      </div>
    </article>
  );
}
