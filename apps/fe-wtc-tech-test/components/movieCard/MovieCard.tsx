import React from 'react';
import StarRating from '../starRating/StarRating';
import { IMovieCard } from '../../state/movies/types';
import classnames from 'classnames';
import { logger } from '../../utils';
import {
  FavoriteIcon,
  FavoriteBorderIcon,
  VisibilityIcon,
  VisibilityOffIcon,
} from '@mono-nx-test-with-nextjs/ui';

import './MovieCard.css';

export interface MovieCardProps {
  movie: IMovieCard;
  saveClickHandler: (
    id: string,
    saved: boolean,
    watched: boolean
  ) => Promise<void>;
  watchedClickHandler: (
    id: string,
    saved: boolean,
    watched: boolean
  ) => Promise<void>;
}

const MovieCard = ({
  movie,
  saveClickHandler,
  watchedClickHandler,
}: MovieCardProps) => {
  const { Title, Poster, Rating, imdbID, Watched, Saved } = movie;

  const classes = classnames(
    { 'white-bg': !Watched && !Saved },
    { 'orange-bg': !Watched && Saved },
    { 'yellow-bg': Watched && !Saved },
    { 'green-bg': Watched && Saved }
  );

  const WatchedIcon = Watched ? VisibilityIcon : VisibilityOffIcon;
  const SavedIcon = Saved ? FavoriteIcon : FavoriteBorderIcon;

  return (
    <div id={imdbID} className={`movie-card ${classes}`}>
      <div className="movie-card__icons">
        <WatchedIcon
          onClick={() => watchedClickHandler(imdbID, Saved, !Watched)}
        />
        <SavedIcon onClick={() => saveClickHandler(imdbID, !Saved, Watched)} />
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

function areEqual(prevProps: MovieCardProps, nextProps: MovieCardProps) {
  return Object.is(prevProps.movie, nextProps.movie);
}

export default React.memo(MovieCard, areEqual);
