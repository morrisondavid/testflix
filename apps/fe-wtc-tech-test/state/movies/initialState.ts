import { IMoviesContext } from './types';

const initialState: IMoviesContext = {
  movies: [],
  moviesById: {},
  error: null,
};

export default initialState;
