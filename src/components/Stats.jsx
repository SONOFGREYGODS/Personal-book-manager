export default function Stats({ count = 0, avg }) {
  const hasAvg = Number.isFinite(avg) && avg > 0;
  const displayAvg = hasAvg
    ? new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 1 }).format(avg)
    : '—';

  return (
    <div className="stats">
      <span>Всего: <b>{count}</b></span>
      <span>Средний рейтинг: <b>{displayAvg}</b></span>
    </div>
  );
}
