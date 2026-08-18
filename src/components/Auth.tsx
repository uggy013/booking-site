import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { getFriendlyAuthMessage } from '../lib/authMessages';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import { AuthForm } from './AuthForm';
import { SupabaseSetupMessage } from './SupabaseSetupMessage';

export function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [isSessionLoading, setIsSessionLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setIsSessionLoading(false);
      return undefined;
    }

    supabase.auth
      .getSession()
      .then(({ data }) => {
        setSession(data.session);
      })
      .catch(() => {
        setMessage('Не удалось проверить вход. Обнови страницу или попробуй позже.');
      })
      .finally(() => {
        setIsSessionLoading(false);
      });

    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => data.subscription.unsubscribe();
  }, []);

  if (!isSupabaseConfigured) return <SupabaseSetupMessage />;

  if (isSessionLoading) {
    return (
      <section className="auth-card">
        <p className="eyebrow">easybook</p>
        <h1>Проверяем вход</h1>
        <p className="loading-note">Секунду, смотрим твой аккаунт.</p>
      </section>
    );
  }

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
      setMessage(getFriendlyAuthMessage(error.message));
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
      setMessage(getFriendlyAuthMessage(error.message));
      return;
    }

    if (mode === 'signup') {
      setMessage('Готово! Проверь почту, если EasyBook попросит подтвердить регистрацию.');
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
          {busy ? 'Выходим...' : 'Выйти'}
        </button>
      </section>
    );
  }

  return (
    <section className="auth-card">
      <p className="eyebrow">easybook</p>
      <h1>{mode === 'signin' ? 'Вход' : 'Регистрация'}</h1>

      <AuthForm
        busy={busy}
        email={email}
        mode={mode}
        password={password}
        onEmailChange={setEmail}
        onGoogleSignIn={handleGoogleSignIn}
        onModeChange={setMode}
        onPasswordChange={setPassword}
        onSubmit={handleSubmit}
      />

      {message && <p className="message">{message}</p>}
    </section>
  );
}
