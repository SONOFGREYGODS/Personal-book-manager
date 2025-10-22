function Stars({ n = 0 }) {
  const v = Math.max(0, Math.min(5, Number(n) || 0));
  if (!v) return <span className="muted">Без оценки</span>;
  return <span aria-label={`${v} из 5`}>{'★'.repeat(v)}{'☆'.repeat(5 - v)}</span>;
}

export default function BookCard({ book, onEdit, onDelete }) {
  return (
    <article className="card">
      <div className="cover">
        {book.cover_url ? (
          <img
            src={book.cover_url}
            alt={book.title}
            onError={(e) => {
              // прячем битую картинку
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <div className="placeholder">Нет обложки</div>
        )}
      </div>

      <div className="meta">
        <h3 className="title">{book.title}</h3>
        <div className="author">{book.author}</div>
        <div className="row between">
          <div className="muted">{book.year ?? '—'}</div>
          <div className="rating">
            <Stars n={book.rating || 0} />
          </div>
        </div>
      </div>

      <div className="actions">
        <button className="btn" onClick={onEdit}>Редактировать</button>
        <button className="btn danger" onClick={onDelete}>Удалить</button>
      </div>
    </article>
  );
}
