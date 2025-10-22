export default function SearchBar({ value = '', onChange = () => {} }) {
  return (
    <input
      className="search"
      type="search"
      placeholder="Поиск: название или автор…"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Поиск по названию и автору"
      autoComplete="off"
    />
  );
}
