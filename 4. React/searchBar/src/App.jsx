import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      setError(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    const timerId = setTimeout(async () => {
      try {
        const response = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        const extractedMovies = data.map((item) => item.show);
        setMovies(extractedMovies);
        
      } catch (err) {
        setError(err.message);
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    }, 600);

    return () => {
      clearTimeout(timerId);
    };

  }, [query]);

  return (
    <div className="search-container">
      <h2>Movie & TV Show Search</h2>
      
      <input
        type="text"
        className="search-input"
        placeholder="Type a movie name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {isLoading && <p className="loading-text">Searching the database...</p>}
      {error && <p className="error-text">Error: {error}</p>}
      {!isLoading && !error && movies.length === 0 && query.trim() && (
        <p>No movies found for "{query}"</p>
      )}

      <ul className="movie-list">
        {movies.map((movie) => (
          <li key={movie.id} className="movie-item">
            {movie.image ? (
              <img src={movie.image.medium} alt={movie.name} className="movie-thumbnail" />
            ) : (
              <div className="movie-placeholder"></div>
            )}
            
            <div className="movie-info">
              <strong>{movie.name}</strong>
              <p className="movie-subtitle">
                {movie.premiered ? movie.premiered.substring(0, 4) : 'Unknown Year'} • {movie.language}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;