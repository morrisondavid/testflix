import React from 'react';
import { IMoviesContext } from './types';
import initialState from './initialState';

const MoviesContext = React.createContext<IMoviesContext>(initialState);

export default MoviesContext;
