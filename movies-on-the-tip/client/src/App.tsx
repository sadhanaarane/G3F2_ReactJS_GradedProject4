import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import FavoritesList from './components/FavouriteList';
import ComingSoon from './components/ComingSoon';
import InTheaters from './components/InTheaters';
import TopRatedIndian from './components/TopRatedIndian';
import TopRated from './components/TopRated';
import Modal from './components/Modal';

import './App.css';
import axios from 'axios';

const App: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<any | null>(null);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [category, setCategory] = useState<string>('movies-coming');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    // Fetch the data from the server based on the selected category
    axios.get(`http://localhost:4000/${category}`)
      .then(response => {
        setMovies(response.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [category]);

  const handleSelectMovie = (id: string) => {
    const movie = movies.find(movie => movie.id === id);
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleFavoriteMovie = (id: string) => {
    const movie = movies.find(movie => movie.id === id);
    if (movie) {
      if (favorites.some(fav => fav.id === id)) {
        setFavorites(favorites.filter(fav => fav.id !== id));
      } else {
        setFavorites([...favorites, movie]);
      }
    }
  };

  const handleRemoveFavorite = (id: string) => {
    setFavorites(favorites.filter(movie => movie.id !== id));
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
  };

  const handleSearch = (query: string, selectedCategory: string) => {
    setSearchQuery(query);
    console.log('Searching for:', query, 'in category:', selectedCategory);
    axios.get(`http://localhost:4000/${selectedCategory}/?title_like=${encodeURIComponent(`^${query}`)}`)
      .then(response => {
        console.log('Search results:', response.data);
        setMovies(response.data);
      })
      .catch(error => console.error('Error searching data:', error));
  };

  const fetchSuggestions = async (query: string) => {
    try {
      const response = await axios.get(`http://localhost:4000/suggestions?query=${query}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      return [];
    }
  };

  const handleSearchInputChange = (query: string) => {
    setSearchQuery(query);
    console.log('Input changed:', query);
    if (query.length > 0) {
      fetchSuggestions('query').then((suggestions) => {
        console.log(suggestions);
      });
    } else {
      setSuggestions([]);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <div className="app">
      <Navbar
        onCategoryChange={handleCategoryChange}
        onSearch={handleSearch}
        onSearchInputChange={handleSearchInputChange}
        suggestions={suggestions}
        selectedCategory={category} 
      />
      <Routes>
        <Route path="/movies-coming" element={<ComingSoon />} />
        <Route path="/movies-in-theaters" element={<InTheaters />} />
        <Route path="/top-rated-india" element={<TopRatedIndian />} />
        <Route path="/top-rated-movies" element={<TopRated />} />
        <Route
          path="/favourite"
          element={<FavoritesList favoriteMovies={favorites} onSelect={handleSelectMovie} onRemove={handleRemoveFavorite} />}
        />
      </Routes>
      <div className="content">
        <section id="coming-soon">
          <MovieList movies={movies} onSelect={handleSelectMovie} onFavorite={handleFavoriteMovie} favorites={favorites} />
        </section>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          {selectedMovie && <MovieDetail movie={selectedMovie} />}
        </Modal>
      </div>
    </div>
  );
};

export default App;
