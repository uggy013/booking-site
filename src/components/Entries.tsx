import { useEffect, useState } from 'react';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import { SupabaseSetupMessage } from './SupabaseSetupMessage';

type Entry = {
  id: string;
  title: string;
  created_at: string;
};

export function Entries({ userEmail }: { userEmail: string }) {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  async function load() {
    setIsLoading(true);
    setError('');
    const { data, error } = await supabase
      .from('entries')
      .select('id, title, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      setError('Не удалось загрузить записи. Проверь интернет и обнови страницу.');
    } else {
      setEntries(data ?? []);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    if (isSupabaseConfigured) void load();
  }, []);

  if (!isSupabaseConfigured) return <SupabaseSetupMessage />;

  async function add(event: React.FormEvent) {
    event.preventDefault();
    if (!title.trim()) return;

    setIsSaving(true);
    setError('');
    const { error } = await supabase.from('entries').insert({ title: title.trim() });

    if (error) {
      setError('Не удалось добавить запись. Попробуй ещё раз через минуту.');
    } else {
      setTitle('');
      void load();
    }

    setIsSaving(false);
  }

  async function remove(id: string) {
    setError('');
    const { error } = await supabase.from('entries').delete().eq('id', id);

    if (error) {
      setError('Не удалось удалить запись. Попробуй ещё раз.');
    } else {
      void load();
    }
  }

  return (
    <section className="card">
      <p className="hello">Привет, {userEmail}</p>
      <h2>Мои записи</h2>

      <form onSubmit={add} className="form-row">
        <input placeholder="что добавить..." value={title} onChange={(event) => setTitle(event.target.value)} />
        <button type="submit" disabled={isSaving}>
          {isSaving ? 'Добавляем...' : 'Добавить'}
        </button>
      </form>

      {error && <p className="message">{error}</p>}

      {isLoading ? (
        <p className="loading-note">Загружаем записи...</p>
      ) : entries.length === 0 ? (
        <p className="empty">Пока пусто. Добавь первую запись.</p>
      ) : (
        <ul className="list">
          {entries.map((entry) => (
            <li key={entry.id}>
              <span>{entry.title}</span>
              <button className="ghost small" onClick={() => remove(entry.id)}>
                удалить
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
