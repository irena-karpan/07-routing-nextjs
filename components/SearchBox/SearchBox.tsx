import css from "../SearchBox/SearchBox.module.css";

interface SearchBoxProps {
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBox({ value, handleChange }: SearchBoxProps) {
  return (
    <input
      defaultValue={value}
      onChange={handleChange}
      className={css.input}
      type="text"
      placeholder="Search notes"
    />
  );
}
