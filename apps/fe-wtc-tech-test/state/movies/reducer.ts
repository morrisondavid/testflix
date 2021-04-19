import { IMoviesContext, IMovie } from './types';
import initialState from './initialState';
import { createReducer, required } from '../../utils';
import { IAction } from '../types';
import produce from 'immer';
import ActionTypes from './actionTypes';

const updateMoviesList = (state: IMoviesContext, action: IAction<IMovie[]>) => {
  required(state, 'state');
  required(action, 'action');

  return produce(state, (draft) => {
    draft.movies = action.data;
    draft.moviesById = {};
    action.data.map((movie) => (draft.moviesById[movie.imdbID] = movie));
  });
};

export default createReducer<IMoviesContext>(initialState, {
  [ActionTypes.UPDATE_MOVIES]: updateMoviesList,
});
