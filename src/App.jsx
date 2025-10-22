import { useEffect, useMemo, useState } from 'react';
import { supabase } from './supabase';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import SearchBar from './components/SearchBar';
import RatingFilter from './components/RatingFilter';
import Stats from './components/Stats';

export default function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [ratingFilter, setRatingFilter] = useState(0); // 0 = любой
  const [editing, setEditing] = useState(null); // книга, которую редактируем

  async function fetchBooks(opts = {}) {
    setLoading(true);
    setError('');
    try {
      let q = supabase.from('books').select('*').order('created_at', { ascending: false });

      if (opts.query && opts.query.trim()) {
        const term = opts.query.trim();
        // Поиск по title OR author (case-insensitive)
        q = q.or(`title.ilike.%${term}%,author.ilike.%${term}%`);
      }
      if (opts.rating && Number(opts.rating) > 0) {
        q = q.eq('rating', Number(opts.rating));
      }

      const { data, error: err } = await q;
      if (err) throw err;
      setBooks(data ?? []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBooks({ query, rating: ratingFilter });
  }, [query, ratingFilter]);

  async function addBook(payload) {
    setError('');
    const { data, error: err } = await supabase.from('books').insert(payload).select().single();
    if (err) {
      setError(err.message);
      return;
    }
    setBooks((prev) => [data, ...prev]);
  }

  async function updateBook(id, payload) {
    setError('');
    const { data, error: err } = await supabase
      .from('books')
      .update(payload)
      .eq('id', id)
      .select()
      .single();
    if (err) {
      setError(err.message);
      return;
    }
    setBooks((prev) => prev.map((b) => (b.id === id ? data : b)));
    setEditing(null);
  }

  async function deleteBook(id) {
    if (!confirm('Удалить книгу?')) return;
    setError('');
    const { error: err } = await supabase.from('books').delete().eq('id', id);
    if (err) {
      setError(err.message);
      return;
    }
    setBooks((prev) => prev.filter((b) => b.id !== id));
  }

  const stats = useMemo(() => {
    const count = books.length;
    const rated = books.filter((b) => Number.isFinite(b.rating));
    const avg = rated.length ? rated.reduce((s, b) => s + b.rating, 0) / rated.length : 0;
    return { count, avg: Number(avg.toFixed(1)) };
  }, [books]);

  return (
    <div className="container">
      <header className="header">
        <h1>📚 Books Tracker</h1>
      </header>

      <section className="panel">
        <SearchBar value={query} onChange={setQuery} />
        <RatingFilter value={ratingFilter} onChange={setRatingFilter} />
        <Stats count={stats.count} avg={stats.avg} />
      </section>

      <section className="grid">
        <div className="card form-card">
          <h2>{editing ? 'Редактирование' : 'Добавить книгу'}</h2>
          <BookForm
            key={editing?.id || 'create'}
            initial={editing}
            onCancel={() => setEditing(null)}
            onSubmit={async (values) => {
              if (editing) await updateBook(editing.id, values);
              else await addBook(values);
            }}
          />
          {error && <p className="error">{error}</p>}
        </div>

        <BookList books={books} onEdit={setEditing} onDelete={deleteBook} loading={loading} />
      </section>

      <footer className="footer">React + Supabase • GitHub Pages</footer>
    </div>
  );
}
