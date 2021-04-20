import React, { useContext } from 'react';
import MovieCard from '../components/movieCard/MovieCard';
import MovieCount from '../components/movieCount/MovieCount';
import { MoviesContext } from '../state/movies';

const Home = () => {
  const { movies } = useContext(MoviesContext);

  return (
    <main className={'home-page'}>
      <MovieCount />
      <div className="home-page__grid-container">
        <div className="home-page__grid">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;
