import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import { SupabaseSetupMessage } from './SupabaseSetupMessage';

export function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured) return undefined;

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => data.subscription.unsubscribe();
  }, []);

  if (!isSupabaseConfigured) return <SupabaseSetupMessage />;

  async function handleGoogleSignIn() {
    setBusy(true);
    setMessage('');
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) {
      setMessage(error.message);
      setBusy(false);
    }
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage('');

    const authRequest =
      mode === 'signup'
        ? supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: window.location.origin },
          })
        : supabase.auth.signInWithPassword({ email, password });

    const { error } = await authRequest;
    setBusy(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    if (mode === 'signup') {
      setMessage('Готово! Проверь почту, если Supabase попросит подтверждение.');
    }
  }

  async function handleSignOut() {
    setBusy(true);
    await supabase.auth.signOut();
    setBusy(false);
  }

  if (session) {
    const userEmail = session.user.email ?? 'Google аккаунт';

    return (
      <section className="auth-card">
        <p className="eyebrow">Аккаунт</p>
        <h1>Ты вошёл</h1>
        <p className="auth-card__text">{userEmail}</p>
        <button type="button" onClick={handleSignOut} disabled={busy}>
          Выйти
        </button>
      </section>
    );
  }

  return (
    <section className="auth-card">
      <p className="eyebrow">easybook</p>
      <h1>{mode === 'signin' ? 'Вход' : 'Регистрация'}</h1>

      <div className="auth-tabs" aria-label="Выбор действия">
        <button
          type="button"
          className={mode === 'signin' ? 'auth-tabs__button auth-tabs__button--active' : 'auth-tabs__button'}
          onClick={() => setMode('signin')}
        >
          Войти
        </button>
        <button
          type="button"
          className={mode === 'signup' ? 'auth-tabs__button auth-tabs__button--active' : 'auth-tabs__button'}
          onClick={() => setMode('signup')}
        >
          Зарегистрироваться
        </button>
      </div>

      <button
        type="button"
        className="google-button"
        onClick={handleGoogleSignIn}
        disabled={busy}
      >
        <span aria-hidden="true">G</span>
        Войти через Google
      </button>

      <div className="auth-card__divider">или</div>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <input
          type="password"
          placeholder="пароль (6+ символов)"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          minLength={6}
          required
        />
        <button type="submit" disabled={busy}>
          {busy ? 'Загрузка...' : mode === 'signin' ? 'Войти' : 'Создать аккаунт'}
        </button>
      </form>

      {message && <p className="message">{message}</p>}

      <button
        type="button"
        className="ghost"
        onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
      >
        {mode === 'signin' ? 'Нет аккаунта? Зарегистрируйся' : 'Уже есть аккаунт? Войти'}
      </button>
    </section>
  );
}
