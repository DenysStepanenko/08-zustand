import css from './SearchBox.module.css';

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBox = ({ value, onChange, placeholder = "Search..." }: SearchBoxProps) => {
  return (
    <div className={css.searchBox}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={css.input}
      />
    </div>
  );
};

export default SearchBox;

