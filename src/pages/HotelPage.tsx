import { Link, useRoute } from 'wouter';
import { Hotel, hotels } from '../data/hotels';
import { addHotelToCart } from '../lib/cart';
import { getHotelAmenities, getHotelMapUrl, getHotelReviews } from '../lib/hotelExtras';

const searchedHotelStorageKey = 'easybookSearchedHotel';

function isStoredHotel(value: unknown): value is Hotel {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const hotel = value as Partial<Hotel>;

  return (
    typeof hotel.id === 'string' &&
    typeof hotel.name === 'string' &&
    typeof hotel.location === 'string' &&
    typeof hotel.address === 'string' &&
    typeof hotel.price === 'string' &&
    typeof hotel.rating === 'string' &&
    typeof hotel.description === 'string' &&
    typeof hotel.image === 'string' &&
    Boolean(hotel.details) &&
    Boolean(hotel.photos)
  );
}

function getStoredHotel(hotelId: string | undefined) {
  if (!hotelId) {
    return null;
  }

  try {
    const storedHotel = JSON.parse(window.sessionStorage.getItem(searchedHotelStorageKey) ?? 'null') as unknown;

    return isStoredHotel(storedHotel) && storedHotel.id === hotelId ? storedHotel : null;
  } catch {
    return null;
  }
}

export function HotelPage() {
  const [, params] = useRoute('/hotel/:id');
  const hotel = hotels.find((item) => item.id === params?.id) ?? getStoredHotel(params?.id);

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

      <section className="hotel-info-strip" aria-label="Краткая информация об отеле">
        <div>
          <span>Адрес</span>
          <strong>{hotel.address}</strong>
        </div>
        <div>
          <span>Рейтинг</span>
          <strong>{hotel.rating}</strong>
        </div>
        <div>
          <span>Цена</span>
          <strong>{hotel.price}</strong>
        </div>
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
        <div>
          <h2>Территория</h2>
          <p>{hotel.details.yard}</p>
        </div>
        <div>
          <h2>Еда</h2>
          <p>{hotel.details.cafe}</p>
        </div>
        <div>
          <h2>Номера</h2>
          <p>{hotel.details.rooms}</p>
        </div>
        <div>
          <h2>Перед бронированием</h2>
          <p>
            Проверь даты, количество гостей и тип номера. После этого отель можно добавить в корзину
            или сразу перейти к бронированию.
          </p>
        </div>
      </section>
    </main>
  );
}
