import { IAction } from '../types';
import { moviesReducer, ActionTypes, initialState } from './index';
import { IMovie } from './types';

const mockMovie = () => ({
  Title: 'Blade Runner',
  Year: '1982',
  Rated: 'R',
  Released: '25 Jun 1982',
  Runtime: '117 min',
  Genre: 'Action, Sci-Fi, Thriller',
  Director: 'Ridley Scott',
  Writer:
    'Hampton Fancher (screenplay), David Webb Peoples (screenplay), Philip K. Dick (novel)',
  Actors: 'Harrison Ford, Rutger Hauer, Sean Young, Edward James Olmos',
  Plot:
    'A blade runner must pursue and terminate four replicants who stole a ship in space, and have returned to Earth to find their creator.',
  Language: 'English, German, Cantonese, Japanese, Hungarian, Arabic',
  Country: 'USA',
  Awards: 'Nominated for 2 Oscars. Another 12 wins & 16 nominations.',
  Poster:
    'https://m.media-amazon.com/images/M/MV5BNzQzMzJhZTEtOWM4NS00MTdhLTg0YjgtMjM4MDRkZjUwZDBlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
  Ratings: [
    { Source: 'Internet Movie Database', Value: '8.1/10' },
    { Source: 'Rotten Tomatoes', Value: '90%' },
    { Source: 'Metacritic', Value: '84/100' },
  ],
  Metascore: '84',
  imdbRating: '8.1',
  imdbVotes: '663,604',
  imdbID: 'tt0083658',
  Type: 'movie',
  DVD: '27 Aug 1997',
  BoxOffice: 'N/A',
  Production: 'Warner Bros. Pictures',
  Website: 'N/A',
  Watched: 'True',
  Saved: 'False',
});

describe('MoviesReducer', () => {
  describe(`${ActionTypes.UPDATE_MOVIES}`, () => {
    it('updates state correctly', () => {
      const data = [mockMovie()];

      const state = { ...initialState };
      const action: IAction<IMovie[]> = {
        type: ActionTypes.UPDATE_MOVIES,
        data,
      };

      const newState = moviesReducer(state, action);

      const expectedMoviesById = {};
      action.data.map((movie) => (expectedMoviesById[movie.imdbID] = movie));

      expect(newState).not.toBe(state);
      expect(newState.movies).toEqual(action.data);
      expect(newState.moviesById).toEqual(expectedMoviesById);
    });

    it('new state is immutable', () => {
      const data = [mockMovie()];
      const state = { ...initialState };
      const action: IAction<IMovie[]> = {
        type: ActionTypes.UPDATE_MOVIES,
        data,
      };

      const newState = moviesReducer(state, action);

      const newData = mockMovie();

      const mutateMovies = () => {
        newState.movies.push(newData);
      };

      const mutateMoviesById = () => {
        newState.moviesById['999'] = newData;
      };

      expect(mutateMovies).toThrowError();
      expect(mutateMoviesById).toThrowError();
    });
  });
});
