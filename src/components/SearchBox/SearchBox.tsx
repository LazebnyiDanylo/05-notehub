import css from "./SearchBox.module.css";

interface SearchBoxProps {
  value: string;
  onSearch: (value: string) => void;
}

export default function SearchBox({ value, onSearch }: SearchBoxProps) {
  return <input className={css.input} value={value} onChange={(event) => onSearch(event.target.value)} type="text" placeholder="Search notes" />;
}
