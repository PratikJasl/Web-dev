
//Step1: Capture user input in a state.
//Step2: On change of user-input make an API call.

import { useEffect, useState } from "react"
import "./App.css"

function App(){
  const[userInput, setUserInput] = useState('');
  const[movieList, setMovieList] = useState([]);
  const[error, setError] = useState('');
  const[loading, setLoading] = useState(false);

  useEffect(() => {
  
    if(!userInput.trim()){
      setMovieList([])
      setError('')
      setLoading(false)
      return
    }

    //Make an API call to backend to fetch the data.
    const controller = new AbortController();
    const timerId = setTimeout(async() => {
      setLoading(true)
      setError('')
      setMovieList([])
      try {
        const response = await fetch(
          `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(userInput)}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          setError("Couldn't fetch shows. Please try again.")
          return
        }

        const data = await response.json()

        const extractedMovies = data.map((movie)=>{
          return movie.show
        })

        setMovieList(extractedMovies);
      } catch (error) {
        if (error?.name !== "AbortError") {
          setError("Something went wrong. Please try again.")
        }
      } finally {
        setLoading(false)
      }
    }, 600);

    return () => {
      clearTimeout(timerId);
      controller.abort();
    }

  }, [userInput]);

  const stripHtml = (html) => {
    if(!html) return ''
    const doc = new DOMParser().parseFromString(String(html), "text/html")
    return doc.body.textContent || ''
  }

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return(
    <div className="app">
      <header className="app-header">
        <h1>TV Show Explorer</h1>
        <p className="subtext">Search for shows and browse results powered by TVMaze.</p>
      </header>

      <section className="search-card">
        <form className="search-form" onSubmit={handleSubmit}>
          <label className="visually-hidden" htmlFor="movie-search">
            Search shows
          </label>
          <input
            id="movie-search"
            className="search-input"
            type="text"
            placeholder="Enter TV show name"
            value={userInput}
            onChange={(event) => setUserInput(event.target.value)}
          />
          <button
            className="search-button"
            type="submit"
            disabled={loading || !userInput.trim()}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
      </section>

      {error ? (
        <div className="error-banner" role="alert">
          {error}
        </div>
      ) : null}

      <section className="results" aria-live="polite">
        {loading && movieList.length === 0 ? (
          <div className="movies-grid" aria-hidden="true">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="movie-card skeleton-card">
                <div className="movie-media">
                  <div className="movie-placeholder" />
                </div>
                <div className="movie-body">
                  <div className="skeleton-line skeleton-title" />
                  <div className="skeleton-line" />
                  <div className="skeleton-line" />
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {!loading && userInput.trim() && movieList.length === 0 && !error ? (
          <div className="empty-state">
            <div className="empty-title">No shows found</div>
            <div className="empty-subtitle">Try a different search term.</div>
          </div>
        ) : null}

        {movieList.length > 0 ? (
          <div className="movies-grid">
            {movieList.map((movie)=>(
              <article key={movie.id} className="movie-card">
                <div className="movie-media">
                  {movie.image ? (
                    <img
                      src={movie.image.medium}
                      alt={movie.name}
                      className="movie-image"
                    />
                  ) : (
                    <div className="movie-placeholder" />
                  )}
                </div>

                <div className="movie-body">
                  <h2 className="movie-title">{movie.name}</h2>

                  <div className="movie-meta">
                    {typeof movie?.rating?.average === "number" ? (
                      <span className="meta-pill">
                        Rating: {movie.rating.average.toFixed(1)}
                      </span>
                    ) : (
                      <span className="meta-pill meta-muted">No rating</span>
                    )}
                    {movie?.premiered ? (
                      <span className="meta-pill">
                        Year: {movie.premiered.split("-")[0]}
                      </span>
                    ) : null}
                  </div>

                  {Array.isArray(movie?.genres) && movie.genres.length > 0 ? (
                    <div className="pills" aria-label="Genres">
                      {movie.genres.slice(0, 4).map((genre)=>(
                        <span key={genre} className="pill">
                          {genre}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  {movie?.summary ? (
                    <p className="description">{stripHtml(movie.summary)}</p>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </section>
    </div>
  )
}

export default App