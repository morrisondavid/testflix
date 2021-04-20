/* eslint-disable */
import { ActionTypes } from '.';
import { IError, IMovie, IMoviesActionCreatrors } from './types';
import moviesApi from '../../data/moviesApi';
import { IAction } from '../types';

class MoviesActionCreators implements IMoviesActionCreatrors {
  private dispatch: (action: IAction<any>) => any;

  constructor(dispatch: (action: IAction<any>) => any) {
    this.dispatch = dispatch;
  }

  getAllMovies = async () => {
    const result = await moviesApi.getMovies();

    const updateMoviesAction: IAction<IMovie[]> = {
      type: ActionTypes.UPDATE_MOVIES,
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
}

const useMoviesActionsCreators = (dispatch: (action: IAction<any>) => any) =>
  new MoviesActionCreators(dispatch);

export default useMoviesActionsCreators;
