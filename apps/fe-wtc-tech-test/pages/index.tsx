import React, { useContext } from 'react';
import { MoviesContext } from '../state/movies';

const Home = () => {
  const { movies } = useContext(MoviesContext);

  return (
    <main>
      <h1>{`Movies (${movies.length})`}</h1>
      <h1>Edit apps/fe-wtc-tech-test/pages/index.tsx and save to reload.</h1>
      <h2>Click on the instructions button to understand what to do</h2>
    </main>
  );
};

export default Home;
