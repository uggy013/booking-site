import { useEffect, useState } from 'react';
import type { Hotel } from '../data/hotels';
import { HotelCard } from './HotelCard';

type HotelSectionProps = {
  eyebrow: string;
  title: string;
  hotels: Hotel[];
  favoriteIds?: string[];
  onFavoriteToggle?: (hotelId: string) => void;
};

export function HotelSection({
  eyebrow,
  title,
  hotels,
  favoriteIds = [],
  onFavoriteToggle,
}: HotelSectionProps) {
  const [localFavoriteIds, setLocalFavoriteIds] = useState<string[]>(() => {
    const savedFavorites = window.localStorage.getItem('favoriteHotels');
    return savedFavorites ? (JSON.parse(savedFavorites) as string[]) : [];
  });
  const activeFavoriteIds = favoriteIds.length > 0 ? favoriteIds : localFavoriteIds;

  useEffect(() => {
    window.localStorage.setItem('favoriteHotels', JSON.stringify(localFavoriteIds));
  }, [localFavoriteIds]);

  function handleFavoriteToggle(hotelId: string) {
    if (onFavoriteToggle) {
      onFavoriteToggle(hotelId);
      return;
    }

    setLocalFavoriteIds((current) =>
      current.includes(hotelId) ? current.filter((id) => id !== hotelId) : [...current, hotelId],
    );
  }

  return (
    <section className="section">
      <div className="section__title">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      <div className="hotels-grid">
        {hotels.map((hotel) => (
          <HotelCard
            key={hotel.id}
            hotel={hotel}
            isFavorite={activeFavoriteIds.includes(hotel.id)}
            onFavoriteToggle={handleFavoriteToggle}
          />
        ))}
      </div>
    </section>
  );
}
