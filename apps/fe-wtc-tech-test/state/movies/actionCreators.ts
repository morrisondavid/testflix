/* eslint-disable */
import { ActionTypes } from '.';
import {
  IError,
  IMovie,
  IMoviesActionCreators,
  IUpdateMovieData,
} from './types';
import moviesApi from '../../data/moviesApi';
import { IAction } from '../types';
import MoviesContext from './context';

class MoviesActionCreators implements IMoviesActionCreators {
  private dispatch: (action: IAction<any>) => any;

  constructor(dispatch: (action: IAction<any>) => any) {
    this.dispatch = dispatch;
  }

  getAllMovies = async () => {
    const result = await moviesApi.getMovies();

    const updateMoviesAction: IAction<IMovie[]> = {
      type: ActionTypes.UPDATE_MOVIES_LIST,
      data: result.value,
    };

    const errorAction: IAction<IError> = {
      type: ActionTypes.ERROR,
      data: { message: result.errors[0], code: result.code },
    };

    result.success
      ? this.dispatch(updateMoviesAction)
      : this.dispatch(errorAction);
  };

  updateMovieState = async (
    imdbID: string,
    saved: boolean,
    watched: boolean
  ) => {
    const result = await moviesApi.updateMovie(imdbID, saved, watched);

    const updateMovieAction: IAction<IUpdateMovieData> = {
      type: ActionTypes.UPDATE_MOVIE,
      data: { imdbID, saved, watched },
    };

    const errorAction: IAction<IError> = {
      type: ActionTypes.ERROR,
      data: {
        message: result.errors[0],
        code: result.code,
      },
    };

    result.success
      ? this.dispatch(updateMovieAction)
      : this.dispatch(errorAction);
  };
}

const useMoviesActionsCreators = (dispatch: (action: IAction<any>) => any) =>
  new MoviesActionCreators(dispatch);

export default useMoviesActionsCreators;
