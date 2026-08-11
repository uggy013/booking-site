import type { BookingService } from '../data/services';

type ServiceCardProps = {
  service: BookingService;
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="service-card">
      <div>
        <h3>{service.title}</h3>
        <p>{service.description}</p>
      </div>
      <div className="service-card__meta">
        <span>{service.duration}</span>
        <strong>{service.price}</strong>
      </div>
    </article>
  );
}
