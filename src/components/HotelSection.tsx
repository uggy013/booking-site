import type { Hotel } from '../data/hotels';
import { HotelCard } from './HotelCard';

type HotelSectionProps = {
  eyebrow: string;
  title: string;
  hotels: Hotel[];
};

export function HotelSection({ eyebrow, title, hotels }: HotelSectionProps) {
  return (
    <section className="section">
      <div className="section__title">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      <div className="hotels-grid">
        {hotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>
    </section>
  );
}
