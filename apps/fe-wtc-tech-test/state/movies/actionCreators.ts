import { ActionTypes } from '.';
import { IMoviesActionCreatrors } from './types';
import moviesApi from '../../data/moviesApi';
import { logger } from '../../utils';
import { IAction } from '../types';

class MoviesActionCreators implements IMoviesActionCreatrors {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private dispatch: (action: IAction<any>) => any;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(dispatch: (action: IAction<any>) => any) {
    this.dispatch = dispatch;
  }

  getAllMovies = async () => {
    const result = await moviesApi.getMovies();

    result.success
      ? this.dispatch({ type: ActionTypes.UPDATE_MOVIES, data: result.value })
      : logger.error(result.errors[0]);
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useMoviesActionsCreators = (dispatch: (action: IAction<any>) => any) =>
  new MoviesActionCreators(dispatch);

export default useMoviesActionsCreators;
