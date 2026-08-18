type AuthFormProps = {
  busy: boolean;
  email: string;
  mode: 'signin' | 'signup';
  password: string;
  onEmailChange: (value: string) => void;
  onGoogleSignIn: () => void;
  onModeChange: (mode: 'signin' | 'signup') => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (event: React.FormEvent) => void;
};

export function AuthForm({
  busy,
  email,
  mode,
  password,
  onEmailChange,
  onGoogleSignIn,
  onModeChange,
  onPasswordChange,
  onSubmit,
}: AuthFormProps) {
  return (
    <>
      <div className="auth-tabs" aria-label="Выбор действия">
        <button
          type="button"
          className={mode === 'signin' ? 'auth-tabs__button auth-tabs__button--active' : 'auth-tabs__button'}
          onClick={() => onModeChange('signin')}
        >
          Войти
        </button>
        <button
          type="button"
          className={mode === 'signup' ? 'auth-tabs__button auth-tabs__button--active' : 'auth-tabs__button'}
          onClick={() => onModeChange('signup')}
        >
          Зарегистрироваться
        </button>
      </div>

      <button type="button" className="google-button" onClick={onGoogleSignIn} disabled={busy}>
        <span aria-hidden="true">G</span>
        {busy ? 'Открываем Google...' : 'Войти через Google'}
      </button>

      <div className="auth-card__divider">или</div>

      <form onSubmit={onSubmit} className="form">
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(event) => onEmailChange(event.target.value)}
          required
        />
        <input
          type="password"
          placeholder="пароль (6+ символов)"
          value={password}
          onChange={(event) => onPasswordChange(event.target.value)}
          minLength={6}
          required
        />
        <button type="submit" disabled={busy}>
          {busy ? 'Загрузка...' : mode === 'signin' ? 'Войти' : 'Создать аккаунт'}
        </button>
      </form>

      <button type="button" className="ghost" onClick={() => onModeChange(mode === 'signin' ? 'signup' : 'signin')}>
        {mode === 'signin' ? 'Нет аккаунта? Зарегистрируйся' : 'Уже есть аккаунт? Войти'}
      </button>
    </>
  );
}
