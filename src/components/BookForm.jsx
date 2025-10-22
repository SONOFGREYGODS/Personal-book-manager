import { useEffect, useState } from 'react';

const empty = { title: '', author: '', year: '', rating: '', cover_url: '' };

export default function BookForm({ initial, onSubmit, onCancel }) {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initial) {
      setValues({
        title: initial.title ?? '',
        author: initial.author ?? '',
        year: initial.year ?? '',
        rating: initial.rating ?? '',
        cover_url: initial.cover_url ?? '',
      });
    } else {
      setValues(empty);
    }
  }, [initial]);

  function validate(v) {
    const e = {};
    if (!v.title.trim()) e.title = 'Обязательно';
    if (!v.author.trim()) e.author = 'Обязательно';
    if (v.rating !== '' && (v.rating < 1 || v.rating > 5)) e.rating = '1–5';
    if (v.year !== '' && (v.year < 0 || v.year > 3000)) e.year = '0–3000';
    return e;
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    const e = validate(values);
    setErrors(e);
    if (Object.keys(e).length) return;

    const payload = {
      title: values.title.trim(),
      author: values.author.trim(),
      year: values.year === '' ? null : Number(values.year),
      rating: values.rating === '' ? null : Number(values.rating),
      cover_url: values.cover_url.trim() || null,
    };
    onSubmit(payload);
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <label>
        Название*
        <input
          type="text"
          value={values.title}
          onChange={(e) => setValues((v) => ({ ...v, title: e.target.value }))}
          placeholder="Например, Мастер и Маргарита"
        />
        {errors.title && <span className="field-error">{errors.title}</span>}
      </label>

      <label>
        Автор*
        <input
          type="text"
          value={values.author}
          onChange={(e) => setValues((v) => ({ ...v, author: e.target.value }))}
          placeholder="М. Булгаков"
        />
        {errors.author && <span className="field-error">{errors.author}</span>}
      </label>

      <div className="row">
        <label>
          Год
          <input
            type="number"
            inputMode="numeric"
            value={values.year}
            onChange={(e) => setValues((v) => ({ ...v, year: e.target.value }))}
            placeholder="2024"
          />
          {errors.year && <span className="field-error">{errors.year}</span>}
        </label>

        <label>
          Рейтинг
          <select
            value={values.rating}
            onChange={(e) => setValues((v) => ({ ...v, rating: e.target.value }))}
          >
            <option value="">–</option>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
          {errors.rating && <span className="field-error">{errors.rating}</span>}
        </label>
      </div>

      <label>
        Обложка (URL)
        <input
          type="url"
          value={values.cover_url}
          onChange={(e) => setValues((v) => ({ ...v, cover_url: e.target.value }))}
          placeholder="https://.../cover.jpg"
        />
      </label>

      <div className="actions">
        {onCancel && (
          <button type="button" className="btn ghost" onClick={onCancel}>
            Отмена
          </button>
        )}
        <button type="submit" className="btn primary">
          {initial ? 'Сохранить' : 'Добавить'}
        </button>
      </div>
    </form>
  );
}