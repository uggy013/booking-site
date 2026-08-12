import { Link } from 'wouter';
import { Auth } from '../components/Auth';

export function LoginPage() {
  return (
    <main className="page">
      <header className="topbar">
        <Link href="/">easybook</Link>
        <Link className="topbar__link" href="/">
          На главную
        </Link>
      </header>

      <div className="auth-layout">
        <Auth />
      </div>
    </main>
  );
}
