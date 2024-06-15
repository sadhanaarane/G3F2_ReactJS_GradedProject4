import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import '../styles/NavBar.css';

interface NavbarProps {
  onCategoryChange: (category: string) => void;
  onSearch: (query: string, selectedCategory: string) => void;
  onSearchInputChange: (query: string) => void;
  suggestions: string[];
  selectedCategory: string;
}

const Navbar: React.FC<NavbarProps> = ({ onCategoryChange, onSearch, onSearchInputChange, suggestions }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('movies-coming');
  const [searchInput, setSearchInput] = useState<string>('');

  useEffect(() => {
    if (searchInput.trim() !== '') {
      onSearch(searchInput, selectedCategory);
    }
  }, [searchInput, selectedCategory, onSearch]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    onCategoryChange(category);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchInput(query);
    onSearchInputChange(query);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchInput, selectedCategory); // Trigger search with current input
    setSearchInput(''); // Reset the search field
    setTimeout(() => {
      onSearch('', selectedCategory); // Trigger search with empty input after resetting
    }, 0); // Ensure the state is updated before the second search
  };

  return (
    <nav className="navbar">
      <div className="navbar-title">Movies On The Tip</div>
      <form className="search-form" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search movies..."
          value={searchInput}
          onChange={handleSearchInputChange}
        />
        <button type="submit">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      )}
      <ul className="nav-links">
        <li className={selectedCategory === 'movies-coming' ? 'selected' : ''} onClick={() => handleCategoryClick('movies-coming')}>
          <Link to="/movies-coming">Coming Soon</Link>
        </li>
        <li className={selectedCategory === 'movies-in-theaters' ? 'selected' : ''} onClick={() => handleCategoryClick('movies-in-theaters')}>
          <Link to="/movies-in-theaters">In Theaters</Link>
        </li>
        <li className={selectedCategory === 'top-rated-india' ? 'selected' : ''} onClick={() => handleCategoryClick('top-rated-india')}>
          <Link to="/top-rated-india">Top Rated Indian</Link>
        </li>
        <li className={selectedCategory === 'top-rated-movies' ? 'selected' : ''} onClick={() => handleCategoryClick('top-rated-movies')}>
          <Link to="/top-rated-movies">Top Rated</Link>
        </li>
        <li className={selectedCategory === 'favourite' ? 'selected' : ''} onClick={() => handleCategoryClick('favourite')}>
          <Link to="/favourite">Favourites</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
