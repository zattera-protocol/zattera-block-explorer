import { useState, type FormEvent, type ChangeEvent } from 'react';
import { useTranslation } from '../i18n';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (value: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState('');
  const { t } = useTranslation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchValue.trim()) {
      onSearch(searchValue.trim());
    }
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={t('searchBar.placeholder')}
          value={searchValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          {t('searchBar.button')}
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
