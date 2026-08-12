import type { TrainDeal } from '../data/trains';

type TrainCardProps = {
  train: TrainDeal;
};

export function TrainCard({ train }: TrainCardProps) {
  return (
    <article className="travel-card">
      <div>
        <span className="travel-card__badge">{train.wagonType}</span>
        <span>{train.trainName}</span>
        <h3>{train.route}</h3>
        <p>{train.dates}</p>
        <p className="travel-card__hotel">
          Отель: {train.hotelName}, {train.hotelArea}
        </p>
      </div>
      <div className="travel-card__meta">
        <span>{train.duration}</span>
        <strong>{train.price}</strong>
      </div>
    </article>
  );
}
