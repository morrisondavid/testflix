import {
  IMoviesContext,
  IMovie,
  IError,
  ReduceMovieRatings,
  IMovieRating,
  ReduceMovie,
  IUpdateMovieData,
} from './types';
import initialState from './initialState';
import { createReducer, required } from '../../utils';
import { IAction } from '../types';
import produce from 'immer';
import ActionTypes from './actionTypes';

export const getMovieRating: ReduceMovieRatings = (
  movieRatings: IMovieRating[]
) => {
  let percentage = 0,
    rating = 0;

  if (!movieRatings.length) return -1;

  try {
    movieRatings.forEach((rating) => {
      let values;
      if (rating.Value.includes('/')) {
        values = rating.Value.split('/');
        percentage += +values[0] / +values[1];
      } else if (rating.Value.endsWith('%')) {
        values = rating.Value.split('%');
        percentage += +values[0] / 100;
      } else {
        throw new Error('Unrecognised rating');
      }
    });
  } catch {
    return -1;
  }

  percentage = percentage / movieRatings.length;
  rating = (percentage / 20) * 100;

  if (rating > 5) {
    rating = 5;
  }

  return +rating.toFixed(2);
};

export const toMovieCard: ReduceMovie = ({
  Title,
  Poster,
  imdbID,
  Watched,
  Saved,
  Ratings,
}) => ({
  Title,
  Poster,
  imdbID,
  Watched: Watched === 'True',
  Saved: Saved === 'True',
  Rating: getMovieRating(Ratings),
});

const updateMoviesList = (state: IMoviesContext, action: IAction<IMovie[]>) => {
  required(state, 'state');
  required(action, 'action');

  return produce(state, (draft) => {
    draft.error = null;
    draft.moviesById = {};
    draft.movies = action.data.map((movie) => {
      const movieCard = toMovieCard(movie); //Only map the data necessary for the UI
      draft.moviesById[movie.imdbID] = movieCard;

      return movieCard;
    });
  });
};

const updateMovie = (
  state: IMoviesContext,
  action: IAction<IUpdateMovieData>
) => {
  required(state, 'state');
  required(action, 'action');

  return produce(state, (draft) => {
    const { imdbID, saved, watched } = action.data;
    draft.moviesById[imdbID].Saved = saved;
    draft.movies.find((m) => m.imdbID === imdbID).Saved = saved;
    draft.moviesById[imdbID].Watched = watched;
    draft.movies.find((m) => m.imdbID === imdbID).Watched = watched;
  });
};

const registerError = (state: IMoviesContext, action: IAction<IError>) => {
  required(state, 'state');
  required(action, 'action');

  return produce(state, (draft) => {
    draft.error = action.data;
  });
};

export default createReducer<IMoviesContext>(initialState, {
  [ActionTypes.UPDATE_MOVIES_LIST]: updateMoviesList,
  [ActionTypes.ERROR]: registerError,
  [ActionTypes.UPDATE_MOVIE]: updateMovie,
});
