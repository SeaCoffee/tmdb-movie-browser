import React, { useState } from 'react';

import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanSearchTerm = searchTerm.trim();

    if (!cleanSearchTerm) {
      onSearch('');
      return;
    }

    onSearch(cleanSearchTerm);
    setSearchTerm('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="Search for movies..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      <button className={styles.button} type="submit">
        Search
      </button>
    </form>
  );
};