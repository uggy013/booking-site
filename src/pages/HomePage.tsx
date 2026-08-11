import { Link } from 'wouter';
import { ServiceCard } from '../components/ServiceCard';
import { services } from '../data/services';

export function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="hero__content">
          <p className="eyebrow">BookEasy</p>
          <h1>Бронируй услуги без переписок и путаницы</h1>
          <p>
            Выбери услугу, удобное время и оставь заявку. Все просто, быстро и
            понятно с первого экрана.
          </p>
          <Link className="button" href="/booking">
            Забронировать
          </Link>
        </div>
        <div className="hero__panel" aria-label="Ближайшие записи">
          <span>Сегодня</span>
          <strong>16:30</strong>
          <p>Индивидуальный урок</p>
        </div>
      </section>

      <section className="section">
        <div className="section__title">
          <p className="eyebrow">Услуги</p>
          <h2>Что можно забронировать</h2>
        </div>
        <div className="services-grid">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>
    </main>
  );
}
