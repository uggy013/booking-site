import { Link, useRoute } from 'wouter';
import { hotels } from '../data/hotels';
import { addHotelToCart } from '../lib/cart';
import { getHotelAmenities, getHotelMapUrl, getHotelReviews } from '../lib/hotelExtras';

export function HotelPage() {
  const [, params] = useRoute('/hotel/:id');
  const hotel = hotels.find((item) => item.id === params?.id);

  if (!hotel) {
    return (
      <main className="page not-found">
        <h1>Отель не найден</h1>
        <Link className="button" href="/">
          На главную
        </Link>
      </main>
    );
  }

  const photos = [hotel.image, hotel.photos.yard, hotel.photos.cafe, hotel.photos.room];
  const amenities = getHotelAmenities(hotel);
  const reviews = getHotelReviews(hotel);

  return (
    <main className="page">
      <header className="topbar">
        <Link href="/">easybook</Link>
        <Link className="topbar__link" href="/">
          На главную
        </Link>
      </header>

      <section className="hotel-detail">
        <div>
          <p className="eyebrow">{hotel.location}</p>
          <h1>{hotel.name}</h1>
          <p>{hotel.description}</p>
          <div className="hotel-detail__actions">
            <Link className="button" href={`/booking?hotel=${encodeURIComponent(hotel.name)}`}>
              Забронировать
            </Link>
            <button type="button" onClick={() => addHotelToCart(hotel)}>
              В корзину
            </button>
            <a className="button button--light" href={getHotelMapUrl(hotel)} target="_blank" rel="noreferrer">
              Открыть карту
            </a>
          </div>
        </div>
        <strong>{hotel.price}</strong>
      </section>

      <section className="hotel-detail__photos">
        {photos.map((photo) => (
          <img key={photo} src={photo} alt={hotel.name} />
        ))}
      </section>

      <section className="hotel-detail__grid">
        <div>
          <h2>Удобства</h2>
          <div className="hotel-detail__chips">
            {amenities.map((amenity) => (
              <span key={amenity.id}>{amenity.title}</span>
            ))}
          </div>
        </div>
        <div>
          <h2>Отзывы</h2>
          <ul className="hotel-detail__reviews">
            {reviews.map((review) => (
              <li key={review}>{review}</li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
