export function getFriendlyAuthMessage(message: string) {
  const text = message.toLowerCase();

  if (text.includes('invalid login') || text.includes('invalid credentials')) {
    return 'Не получилось войти. Проверь email и пароль, затем попробуй ещё раз.';
  }

  if (text.includes('already registered') || text.includes('already been registered')) {
    return 'Такой email уже зарегистрирован. Попробуй войти вместо регистрации.';
  }

  if (text.includes('network') || text.includes('fetch')) {
    return 'Не удалось связаться с сервером. Проверь интернет и попробуй снова.';
  }

  return 'Что-то пошло не так. Попробуй ещё раз через минуту.';
}
