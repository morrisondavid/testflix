import { IAction } from '../types';
import { moviesReducer, ActionTypes, initialState } from './index';
import { getMovieRating, toMovieCard } from './reducer';
import {
  IError,
  IMovie,
  IMovieCard,
  IMovieRating,
  IMoviesContext,
  IUpdateMovieData,
} from './types';

const mockMovieCard: () => IMovieCard = () => ({
  imdbID: 'tt0083658',
  Title: 'Blade Runner',
  Poster:
    'https://m.media-amazon.com/images/M/MV5BNzQzMzJhZTEtOWM4NS00MTdhLTg0YjgtMjM4MDRkZjUwZDBlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
  Rating: 4.25,
  Saved: 'True',
  Watched: 'False',
});

const mockMovie: () => IMovie = () => ({
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
  describe(`${ActionTypes.UPDATE_MOVIES_LIST}`, () => {
    it('updates state correctly', () => {
      const data = [mockMovie()];

      const state = { ...initialState };
      const action: IAction<IMovie[]> = {
        type: ActionTypes.UPDATE_MOVIES_LIST,
        data,
      };

      const newState = moviesReducer(state, action);

      const expectedMovies = action.data.map((movie) => toMovieCard(movie));
      const expectedMoviesById = {};
      action.data.map(
        (movie) => (expectedMoviesById[movie.imdbID] = toMovieCard(movie))
      );

      expect(newState).not.toBe(state);
      expect(newState.movies).toEqual(expectedMovies);
      expect(newState.moviesById).toEqual(expectedMoviesById);
    });

    it('new state is immutable', () => {
      const data = [mockMovie()];
      const state = { ...initialState };
      const action: IAction<IMovie[]> = {
        type: ActionTypes.UPDATE_MOVIES_LIST,
        data,
      };

      const newState = moviesReducer(state, action);

      const newData = toMovieCard(mockMovie());

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

  describe(`${ActionTypes.UPDATE_MOVIE}`, () => {
    it('updates state correctly', () => {
      const movieCard = mockMovieCard();
      const data: IUpdateMovieData = {
        imdbID: 'tt0083658',
        saved: false,
        watched: true,
      };

      const state: IMoviesContext = {
        movies: [movieCard, { ...mockMovieCard(), imdbID: 'tresfg' }],
        moviesById: { tt0083658: movieCard },
        error: null,
      };

      const action: IAction<IUpdateMovieData> = {
        type: ActionTypes.UPDATE_MOVIE,
        data,
      };

      const newState = moviesReducer(state, action);

      //Reference to unchanged objects should stay the same
      expect(newState.movies[1]).toBe(state.movies[1]);
      expect(newState.moviesById['tt0083658'].Saved).toEqual(data.saved);
      expect(newState.moviesById['tt0083658'].Watched).toEqual(data.watched);
      expect(
        newState.movies.find((m) => m.imdbID === 'tt0083658').Saved
      ).toEqual(data.saved);
      expect(
        newState.movies.find((m) => m.imdbID === 'tt0083658').Watched
      ).toEqual(data.watched);
    });

    describe(`${ActionTypes.ERROR}`, () => {
      it('updates state correctly', () => {
        const data: IError = { message: 'test error', code: 404 };

        const state = { ...initialState };
        const action: IAction<IError> = {
          type: ActionTypes.ERROR,
          data,
        };

        const newState = moviesReducer(state, action);

        expect(newState).not.toBe(state);
        expect(newState.error).toEqual(action.data);
      });

      it('new state is immutable', () => {
        const data: IError = { message: 'test error', code: 404 };
        const state = { ...initialState };
        const action: IAction<IError> = {
          type: ActionTypes.ERROR,
          data,
        };

        const newState = moviesReducer(state, action);

        const mutateError = () => {
          newState.error.message = 'new message';
        };

        expect(mutateError).toThrowError();
      });
    });
  });
});

describe('fn() getMovieRating', () => {
  it('returns a valid rating between 0 and 5', () => {
    const ratings: IMovieRating[] = [
      { Source: 'Internet Movie Database', Value: '8.1/10' },
      { Source: 'Rotten Tomatoes', Value: '90%' },
      { Source: 'Metacritic', Value: '84/100' },
    ];

    const fullRatings: IMovieRating[] = [
      { Source: 'Internet Movie Database', Value: '10/10' },
      { Source: 'Rotten Tomatoes', Value: '100%' },
      { Source: 'Metacritic', Value: '100/100' },
    ];

    const noRatings: IMovieRating[] = [
      { Source: 'Internet Movie Database', Value: '0/10' },
      { Source: 'Rotten Tomatoes', Value: '0%' },
      { Source: 'Metacritic', Value: '0/100' },
    ];

    expect(getMovieRating(ratings)).toEqual(4.25);
    expect(getMovieRating(fullRatings)).toEqual(5);
    expect(getMovieRating(noRatings)).toEqual(0);
  });

  it('returns -1 if any of the ratings values are unrecognised', () => {
    const unknownRating: IMovieRating[] = [
      { Source: 'Internet Movie Database', Value: '0-10' },
    ];

    expect(getMovieRating(unknownRating)).toEqual(-1);
  });

  it('returns -1 if ratings array is empty', () => {
    expect(getMovieRating([])).toEqual(-1);
  });

  it('returns 5 if ratings are higher than 5', () => {
    const edgeCaseRatings: IMovieRating[] = [
      { Source: 'Internet Movie Database', Value: '200/10' },
    ];

    const edgeCaseRatings2: IMovieRating[] = [
      { Source: 'Internet Movie Database', Value: '12/10' },
      { Source: 'Rotten Tomatoes', Value: '1000%' },
      { Source: 'Metacritic', Value: '150/100' },
    ];

    expect(getMovieRating(edgeCaseRatings)).toEqual(5);
    expect(getMovieRating(edgeCaseRatings2)).toEqual(5);
  });
});

describe('fn() toMovieCard', () => {
  it('converts IMovie to IMovieCard correctly', () => {
    const expected: IMovieCard = {
      Title: 'Blade Runner',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BNzQzMzJhZTEtOWM4NS00MTdhLTg0YjgtMjM4MDRkZjUwZDBlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
      Rating: 4.25,
      imdbID: 'tt0083658',
      Watched: true,
      Saved: false,
    };

    expect(toMovieCard(mockMovie())).toEqual(expected);
  });

  it('adds new ratings property', () => {
    const movieCard = toMovieCard(mockMovie());

    expect(movieCard.Rating).toBe(4.25);
  });

  it('converts "watched" property to boolean', () => {
    const movieCard = toMovieCard(mockMovie());

    expect(movieCard.Watched).toBe(true);
  });

  it('converts "saved" property to boolean', () => {
    const movieCard = toMovieCard(mockMovie());

    expect(movieCard.Saved).toBe(false);
  });

  it('pure function returns new object', () => {
    const movie = mockMovie();
    const movieCard = toMovieCard(movie);

    expect(movie).not.toBe(movieCard);
  });
});
