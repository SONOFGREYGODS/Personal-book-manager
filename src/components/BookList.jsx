import BookCard from './BookCard';

export default function BookList({ books = [], onEdit, onDelete, loading }) {
  if (loading) {
    return (
      <div className="list">
        <div className="skeleton">Загрузка…</div>
      </div>
    );
  }

  if (!books || books.length === 0) {
    return <div className="list empty">Ничего не найдено</div>;
  }

  return (
    <div className="list">
      {books.map((b) => (
        <BookCard
          key={b.id}
          book={b}
          onEdit={() => onEdit?.(b)}
          onDelete={() => onDelete?.(b.id)}
        />
      ))}
    </div>
  );
}
