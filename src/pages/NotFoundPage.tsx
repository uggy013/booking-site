import { Link } from 'wouter';

export function NotFoundPage() {
  return (
    <main className="page">
      <section className="not-found">
        <p className="eyebrow">404</p>
        <h1>Такой страницы пока нет</h1>
        <Link className="button" href="/">
          Вернуться на главную
        </Link>
      </section>
    </main>
  );
}
