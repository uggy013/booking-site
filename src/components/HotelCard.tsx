import type { Hotel } from '../data/hotels';

type HotelCardProps = {
  hotel: Hotel;
};

export function HotelCard({ hotel }: HotelCardProps) {
  const gallery = [
    { title: 'Двор', text: hotel.details.yard, image: hotel.photos.yard },
    { title: 'Кафе', text: hotel.details.cafe, image: hotel.photos.cafe },
    { title: 'Номер', text: hotel.details.rooms, image: hotel.photos.room },
  ];

  return (
    <article className="hotel-card">
      <img src={hotel.image} alt={hotel.name} />
      <div className="hotel-card__body">
        <div>
          <span>{hotel.location}</span>
          <h3>{hotel.name}</h3>
          <p className="hotel-card__address">{hotel.address}</p>
          <p>{hotel.description}</p>
          <div className="hotel-gallery">
            {gallery.map((item) => (
              <figure key={item.title}>
                <img src={item.image} alt={`${hotel.name}: ${item.title}`} />
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
          <span>★ {hotel.rating}</span>
        </div>
      </div>
    </article>
  );
}
