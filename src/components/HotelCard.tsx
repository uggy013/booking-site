import { Link } from 'wouter';
import type { Hotel } from '../data/hotels';
import { addHotelToCart } from '../lib/cart';
import { getHotelAmenities, getHotelMapUrl } from '../lib/hotelExtras';

type HotelCardProps = {
  hotel: Hotel;
  isFavorite?: boolean;
  onFavoriteToggle?: (hotelId: string) => void;
};

const backupImage =
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80';

export function HotelCard({ hotel, isFavorite = false, onFavoriteToggle }: HotelCardProps) {
  const fallbackImage = hotel.image || backupImage;
  const hotelAmenities = getHotelAmenities(hotel).slice(0, 3);
  const gallery = [
    { title: 'Территория', text: hotel.details.yard, image: hotel.photos.yard },
    { title: 'Еда', text: hotel.details.cafe, image: hotel.photos.cafe },
    { title: 'Номер', text: hotel.details.rooms, image: hotel.photos.room },
  ];

  return (
    <article className="hotel-card">
      <img
        src={hotel.image}
        alt={hotel.name}
        onError={(event) => {
          event.currentTarget.src = backupImage;
        }}
      />
      <div className="hotel-card__body">
        <div>
          <span>{hotel.location}</span>
          <h3>{hotel.name}</h3>
          <p className="hotel-card__address">{hotel.address}</p>
          <p>{hotel.description}</p>
          {hotelAmenities.length > 0 && (
            <div className="hotel-card__amenities">
              {hotelAmenities.map((amenity) => (
                <span key={amenity.id}>{amenity.title}</span>
              ))}
            </div>
          )}
          <div className="hotel-gallery">
            {gallery.map((item) => (
              <figure key={item.title}>
                <img
                  src={item.image}
                  alt={`${hotel.name}: ${item.title}`}
                  onError={(event) => {
                    event.currentTarget.src = fallbackImage;
                  }}
                />
                <figcaption>
                  <strong>{item.title}</strong>
                  <span>{item.text}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
        <div className="hotel-card__meta">
          <strong>{hotel.price}</strong>
          <span>Рейтинг {hotel.rating}</span>
        </div>
        <div className="hotel-card__actions">
          <button type="button" onClick={() => onFavoriteToggle?.(hotel.id)}>
            {isFavorite ? 'Сохранено' : 'Сохранить'}
          </button>
          <Link className="button button--light" href={`/hotel/${hotel.id}`}>
            Подробнее
          </Link>
          <Link className="button" href={`/booking?hotel=${encodeURIComponent(hotel.name)}`}>
            Забронировать
          </Link>
          <button type="button" onClick={() => addHotelToCart(hotel)}>
            В корзину
          </button>
          <a className="button button--light" href={getHotelMapUrl(hotel)} target="_blank" rel="noreferrer">
            Карта
          </a>
        </div>
      </div>
    </article>
  );
}
