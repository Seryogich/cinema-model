import React, { useState } from 'react';
import MovieList from './components/MovieList';
import movies from './data/movies';
import './index.css';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <h1>Movie Schedule</h1>
      <input
        type="text"
        placeholder="Search by movie title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <MovieList movies={filteredMovies} />
    </div>
  );
};

export default App;