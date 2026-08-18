import { useEffect, useMemo, useState } from 'react';
import { Link } from 'wouter';
import { CartLink } from '../components/CartLink';
import { FlightCard } from '../components/FlightCard';
import { HotelSection } from '../components/HotelSection';
import { TrainCard } from '../components/TrainCard';
import { flights } from '../data/flights';
import { Hotel, hotels } from '../data/hotels';
import { trains } from '../data/trains';
import { Amenity, amenities, sortHotels, SortMode } from '../lib/hotelExtras';
import { loadRealHotel } from '../lib/realHotelSearch';

type RegionFilter = 'all' | 'kazakhstan' | 'world';
type RatingFilter = 'all' | '4.5' | '4.8' | '4.9';
type PriceFilter = 'all' | '55000' | '120000' | '400000';
type FavoriteFilter = 'all' | 'favorites';

const economyFlights = flights.filter((flight) => flight.flightClass === 'economy');
const comfortFlights = flights.filter((flight) => flight.flightClass === 'comfort');
const businessFlights = flights.filter((flight) => flight.flightClass === 'business');

const getPrice = (price: string) => Number(price.replace(/\D/g, ''));
const kazakhstanCities = ['Алматы', 'Астана', 'Шымкент', 'Актау', 'Туркестан'];
const popularHotels = [
  hotels.find((hotel) => hotel.id === 'ritz-carlton-almaty'),
  hotels.find((hotel) => hotel.id === 'st-regis-astana'),
  hotels.find((hotel) => hotel.id === 'the-plaza-new-york'),
  hotels.find((hotel) => hotel.id === 'ritz-paris'),
  hotels.find((hotel) => hotel.id === 'burj-al-arab-dubai'),
  hotels.find((hotel) => hotel.id === 'marina-bay-sands-singapore'),
].filter((hotel): hotel is Hotel => hotel !== undefined);
const bestHotels = hotels.filter((hotel) => Number(hotel.rating) >= 4.8);
const cheapHotels = hotels.filter((hotel) => getPrice(hotel.price) <= 55_000);

function isKazakhstanHotel(hotel: Hotel) {
  return kazakhstanCities.some((city) => hotel.location.includes(city));
}

export function HomePage() {
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState<RegionFilter>('all');
  const [rating, setRating] = useState<RatingFilter>('all');
  const [price, setPrice] = useState<PriceFilter>('all');
  const [amenity, setAmenity] = useState<Amenity | 'all'>('all');
  const [sort, setSort] = useState<SortMode>('recommended');
  const [favoriteFilter, setFavoriteFilter] = useState<FavoriteFilter>('all');
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    const savedFavorites = window.localStorage.getItem('favoriteHotels');
    return savedFavorites ? (JSON.parse(savedFavorites) as string[]) : [];
  });
  const [realHotel, setRealHotel] = useState<Hotel | null>(null);
  const [isRealHotelLoading, setIsRealHotelLoading] = useState(false);
  const [realHotelMessage, setRealHotelMessage] = useState('');
  const normalizedQuery = query.trim().toLowerCase();

  const hasFilters =
    normalizedQuery ||
    region !== 'all' ||
    rating !== 'all' ||
    price !== 'all' ||
    amenity !== 'all' ||
    sort !== 'recommended' ||
    favoriteFilter !== 'all';

  const matchedHotels = useMemo(() => {
    return hotels.filter((hotel) => {
      const text = [hotel.name, hotel.location, hotel.address, hotel.description]
        .join(' ')
        .toLowerCase();
      const matchesQuery = !normalizedQuery || text.includes(normalizedQuery);
      const matchesRegion =
        region === 'all' ||
        (region === 'kazakhstan' ? isKazakhstanHotel(hotel) : !isKazakhstanHotel(hotel));
      const matchesRating = rating === 'all' || Number(hotel.rating) >= Number(rating);
      const matchesPrice = price === 'all' || getPrice(hotel.price) <= Number(price);
      const matchesAmenity =
        amenity === 'all' ||
        [hotel.name, hotel.description, ...Object.values(hotel.details)]
          .join(' ')
          .toLowerCase()
          .includes(amenity);
      const matchesFavorite = favoriteFilter === 'all' || favoriteIds.includes(hotel.id);

      return matchesQuery && matchesRegion && matchesRating && matchesPrice && matchesAmenity && matchesFavorite;
    });

  }, [amenity, favoriteFilter, favoriteIds, normalizedQuery, price, rating, region]);

  const foundHotels = sortHotels(realHotel && !isRealHotelLoading ? [realHotel] : matchedHotels, sort);

  useEffect(() => {
    window.localStorage.setItem('favoriteHotels', JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  useEffect(() => {
    let isActive = true;

    if (!normalizedQuery) {
      setRealHotel(null);
      setIsRealHotelLoading(false);
      setRealHotelMessage('');
      return () => {
        isActive = false;
      };
    }

    setIsRealHotelLoading(true);
    setRealHotelMessage('');
    loadRealHotel(query)
      .then((hotel) => {
        if (isActive) {
          setRealHotel(hotel);
          setRealHotelMessage(hotel ? '' : 'Не нашли точные внешние данные. Показываем ближайшие варианты из EasyBook.');
        }
      })
      .catch(() => {
        if (isActive) {
          setRealHotel(null);
          setRealHotelMessage('Внешний поиск сейчас не отвечает. Показываем варианты из EasyBook.');
        }
      })
      .finally(() => {
        if (isActive) {
          setIsRealHotelLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [normalizedQuery, query]);

  function resetFilters() {
    setQuery('');
    setRegion('all');
    setRating('all');
    setPrice('all');
    setAmenity('all');
    setSort('recommended');
    setFavoriteFilter('all');
  }

  function toggleFavorite(hotelId: string) {
    setFavoriteIds((current) =>
      current.includes(hotelId) ? current.filter((id) => id !== hotelId) : [...current, hotelId],
    );
  }

  return (
    <main>
      <header className="home-header">
        <nav className="home-header__actions" aria-label="Аккаунт">
          <CartLink />
          <Link className="button button--light" href="/login">
            Войти
          </Link>
          <Link className="button" href="/login">
            Зарегистрироваться
          </Link>
        </nav>
      </header>

      <section className="hero">
        <div className="hero__content">
          <p className="eyebrow">easybook</p>
          <h1>Бронируй отели, самолеты и поезда</h1>
          <p>
            Выбери реальный отель в Казахстане или за рубежом, посмотри фото и быстро оформи
            бронь.
          </p>
          <Link className="button" href="/booking">
            Забронировать отель
          </Link>
          <Link className="button button--light hero__login" href="/cars">
            Аренда авто
          </Link>
        </div>
        <div className="hero__panel" aria-label="Популярная бронь">
          <span>Популярно сегодня</span>
          <strong>4.9</strong>
          <p>The Ritz-Carlton, Almaty</p>
        </div>
      </section>

      <section className="search-shell" aria-label="Поиск и фильтры отелей">
        <div className="search-bar search-bar--filters">
          <label className="search-field">
            <span>Город или отель</span>
            <input
              type="search"
              placeholder="Tokyo, Paris, Dubai, Hilton, Алматы"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <label className="filter-field">
            <span>Регион</span>
            <select value={region} onChange={(event) => setRegion(event.target.value as RegionFilter)}>
              <option value="all">Все</option>
              <option value="kazakhstan">Казахстан</option>
              <option value="world">Мир</option>
            </select>
          </label>
          <label className="filter-field">
            <span>Рейтинг</span>
            <select value={rating} onChange={(event) => setRating(event.target.value as RatingFilter)}>
              <option value="all">Любой</option>
              <option value="4.5">4.5+</option>
              <option value="4.8">4.8+</option>
              <option value="4.9">4.9+</option>
            </select>
          </label>
          <label className="filter-field">
            <span>Цена до</span>
            <select value={price} onChange={(event) => setPrice(event.target.value as PriceFilter)}>
              <option value="all">Любая</option>
              <option value="55000">55 000 ₸</option>
              <option value="120000">120 000 ₸</option>
              <option value="400000">400 000 ₸</option>
            </select>
          </label>
          <label className="filter-field">
            <span>Удобства</span>
            <select value={amenity} onChange={(event) => setAmenity(event.target.value as Amenity | 'all')}>
              <option value="all">Любые</option>
              {amenities.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
          </label>
          <label className="filter-field">
            <span>Сортировка</span>
            <select value={sort} onChange={(event) => setSort(event.target.value as SortMode)}>
              <option value="recommended">Лучшие</option>
              <option value="rating">Рейтинг</option>
              <option value="price-low">Дешевле</option>
              <option value="price-high">Дороже</option>
            </select>
          </label>
          <label className="filter-field">
            <span>Сохранённые</span>
            <select
              value={favoriteFilter}
              onChange={(event) => setFavoriteFilter(event.target.value as FavoriteFilter)}
            >
              <option value="all">Все</option>
              <option value="favorites">Только сохранённые</option>
            </select>
          </label>
          <button type="button" onClick={resetFilters} disabled={!hasFilters}>
            Сбросить
          </button>
        </div>
      </section>

      {hasFilters ? (
        <>
          {isRealHotelLoading && <p className="loading-note search-status">Ищем детали отеля и фотографии...</p>}
          {realHotelMessage && <p className="message search-status">{realHotelMessage}</p>}
          <HotelSection
            eyebrow="Фильтр"
            title={foundHotels.length > 0 ? `Найдено: ${foundHotels.length}` : 'Ничего не найдено'}
            hotels={foundHotels}
            favoriteIds={favoriteIds}
            onFavoriteToggle={toggleFavorite}
          />
        </>
      ) : (
        <>
          <HotelSection eyebrow="Отели" title="Популярные отели" hotels={popularHotels} />
          <HotelSection eyebrow="Рейтинг" title="Лучшие отели" hotels={bestHotels} />
          <HotelSection eyebrow="Цена" title="Недорогие отели" hotels={cheapHotels} />
        </>
      )}

      <section className="section section--compact">
        <div className="section__title section__title--row">
          <div>
            <p className="eyebrow">Авто</p>
            <h2>Машина на время поездки</h2>
          </div>
          <Link className="button button--light" href="/cars">
            Выбрать автомобиль
          </Link>
        </div>
      </section>

      <section className="section section--compact">
        <div className="section__title section__title--row">
          <div>
            <p className="eyebrow">Авиабилеты</p>
            <h2>Билеты к этим отелям</h2>
          </div>
          <Link className="button button--light" href="/booking">
            Забронировать поездку
          </Link>
        </div>

        <div className="flight-section">
          <h3>Эконом класс</h3>
          <div className="flights-grid">
            {economyFlights.map((flight) => (
              <FlightCard key={flight.id} flight={flight} />
            ))}
          </div>
        </div>

        <div className="flight-section">
          <h3>Комфорт класс</h3>
          <div className="flights-grid">
            {comfortFlights.map((flight) => (
              <FlightCard key={flight.id} flight={flight} />
            ))}
          </div>
        </div>

        <div className="flight-section">
          <h3>Бизнес класс</h3>
          <div className="flights-grid">
            {businessFlights.map((flight) => (
              <FlightCard key={flight.id} flight={flight} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--compact">
        <div className="section__title">
          <p className="eyebrow">Поезда</p>
          <h2>ЖД билеты к этим отелям</h2>
        </div>
        <div className="travel-grid">
          {trains.map((train) => (
            <TrainCard key={train.id} train={train} />
          ))}
        </div>
      </section>
    </main>
  );
}
