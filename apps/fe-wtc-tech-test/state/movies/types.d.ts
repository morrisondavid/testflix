import { IActionCreator } from '../types';
export interface IError {
  message: string;
  code: number;
}

export interface IMovieRating {
  Source: string;
  Value: string;
}
export interface IMovie {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: IMovieRating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Watched: string;
  Saved: string;
}

export type ValidRatings =
  | -1
  | 0
  | 0.5
  | 1
  | 1.5
  | 2
  | 2.5
  | 3
  | 3.5
  | 4
  | 4.5
  | 5;

export interface IMovieCard {
  Title: string;
  Poster: string;
  Rating: number;
  imdbID: string;
  Watched: bool;
  Saved: bool;
}

export type ReduceMovie = (fullMovieDetails: IMovie) => IMovieCard;

export type ReduceMovieRatings = (ratings: IMovieRating[]) => number;
export interface IMoviesContext {
  movies: IMovieCard[];
  moviesById: { [key: string]: IMovieCard };
  error: IError;
}

export interface IMoviesActionCreatrors {
  getAllMovies: IActionCreator;
}
