import React, { useContext } from 'react';
import MovieCard from '../components/movieCard/MovieCard';
import MovieCount from '../components/movieCount/MovieCount';
import { MoviesContext } from '../state/movies';
import { IMoviesActionCreators } from '../state/movies/types';

export interface HomeProps {
  movieActions: IMoviesActionCreators;
}

const Home = ({ movieActions }: HomeProps) => {
  const { movies } = useContext(MoviesContext);

  return (
    <main className={'home-page'}>
      <MovieCount />
      <div className="home-page__grid-container">
        <div className="home-page__grid">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              saveClickHandler={movieActions.updateMovieState}
              watchedClickHandler={movieActions.updateMovieState}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;
