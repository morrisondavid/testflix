import React, { useEffect, useReducer } from 'react';
import { Container, CssBaseline } from '@material-ui/core';
import { Header, Theme } from '@mono-nx-test-with-nextjs/fe-wtc-tech-test';
import { Footer } from '@mono-nx-test-with-nextjs/ui';
import LINKS from '../../../common/links.json';
import { ThemeProvider } from '@material-ui/core/styles';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { moviesReducer, initialState, MoviesContext } from '../state/movies';
import useMoviesActionCreators from '../state/movies/actionCreators';
import ErrorHandler from '../components/errorHandler/ErrorHandler';
import '../styles/styles.css';

const { Instructions, Storybook, Design, Swagger } = LINKS;

const useStyles = makeStyles(() =>
  createStyles({
    contentContainer: {
      padding: '0 27px',
    },
    root: {
      padding: '0',
    },
  })
);

const App = ({ Component, pageProps }) => {
  const [state, dispatch] = useReducer(moviesReducer, initialState);
  const movieActions = useMoviesActionCreators(dispatch);

  useEffect(() => {
    movieActions.getAllMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const classes = useStyles();
  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <Container className={classes.root}>
        <Header />
        <div className={classes.contentContainer}>
          <MoviesContext.Provider value={state}>
            <ErrorHandler>
              <Component movieActions={movieActions} {...pageProps} />
            </ErrorHandler>
          </MoviesContext.Provider>
        </div>
        <Footer links={[Instructions, Design, Swagger, Storybook]} />
      </Container>
    </ThemeProvider>
  );
};

export default App;
