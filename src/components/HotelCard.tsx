import { Link } from 'wouter';
import type { Hotel } from '../data/hotels';

type HotelCardProps = {
  hotel: Hotel;
};

const backupImage =
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80';
const searchedHotelStorageKey = 'easybookSearchedHotel';

export function HotelCard({ hotel }: HotelCardProps) {
  function rememberHotel() {
    window.sessionStorage.setItem(searchedHotelStorageKey, JSON.stringify(hotel));
  }

  return (
    <article className="hotel-card hotel-card--simple">
      <Link
        className="hotel-card__media"
        href={`/hotel/${hotel.id}`}
        aria-label={`Открыть ${hotel.name}`}
        onClick={rememberHotel}
      >
        <img
          src={hotel.image}
          alt={hotel.name}
          onError={(event) => {
            event.currentTarget.src = backupImage;
          }}
        />
      </Link>
      <div className="hotel-card__body">
        <Link className="hotel-card__link" href={`/hotel/${hotel.id}`} onClick={rememberHotel}>
          <h3>{hotel.name}</h3>
        </Link>
      </div>
    </article>
  );
}
