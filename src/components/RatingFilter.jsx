export default function RatingFilter({ value = 0, onChange = () => {} }) {
  const handleChange = (e) => {
    const v = Number(e.target.value);
    onChange(Number.isFinite(v) ? v : 0);
  };

  return (
    <select className="filter" value={String(value)} onChange={handleChange} aria-label="Фильтр по рейтингу">
      <option value="0">Любой рейтинг</option>
      {[1, 2, 3, 4, 5].map((n) => (
        <option key={n} value={String(n)}>
          {n} ⭐
        </option>
      ))}
    </select>
  );
}
