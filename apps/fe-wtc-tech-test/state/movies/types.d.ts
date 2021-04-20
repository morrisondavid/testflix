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

export interface IUpdateMovieData {
  imdbID: string;
  saved: boolean;
  watched: boolean;
}
export interface IMoviesContext {
  movies: IMovieCard[];
  moviesById: { [key: string]: IMovieCard };
  error: IError;
}

export interface IMoviesActionCreators {
  getAllMovies: () => Promise<void>;
  updateMovieState: (
    id: string,
    saved: boolean,
    watched: boolean
  ) => Promise<void>;
}
