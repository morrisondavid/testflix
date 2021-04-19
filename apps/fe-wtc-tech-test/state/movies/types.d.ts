import { IActionCreator } from '../types';

export type IMovieRating = { [Source: string]: string };

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

export interface IMoviesContext {
  movies: IMovie[];
  moviesById: { [key: string]: IMovie };
}

export interface IMoviesActionCreatrors {
  getAllMovies: IActionCreator;
}
