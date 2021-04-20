import React from 'react';
import StarRating from '../starRating/StarRating';
import { IMovieCard } from '../../state/movies/types';
import {
  FavoriteIcon,
  FavoriteBorderIcon,
  VisibilityIcon,
  VisibilityOffIcon,
} from '@mono-nx-test-with-nextjs/ui';

import './MovieCard.css';

export interface MovieCardProps {
  movie: IMovieCard;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const { Title, Poster, Rating, imdbID, Watched, Saved } = movie;

  return (
    <div className="movie-card">
      <div className="movie-card__icons">
        <VisibilityIcon /> <FavoriteIcon />
      </div>
      <div className="movie-card__img">
        <img src={Poster} alt={Title}></img>
      </div>
      <div className="movie-card__rating">
        <StarRating rating={Rating} />
      </div>
    </div>
  );
};

export default MovieCard;
