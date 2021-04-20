import React, { useContext } from 'react';
import { MoviesContext } from '../../state/movies';

import './MovieCount.css';

const MovieCount = () => {
  const { movies } = useContext(MoviesContext);

  return (
    <div className="movie-count">
      <h2>Movies</h2>
      <span>{`(${movies.length})`}</span>
    </div>
  );
};

export default MovieCount;
