import React, { useContext } from 'react';
import Error from 'next/error';
import { MoviesContext } from '../../state/movies';

export default function ErrorHandler({ children }) {
  const { error } = useContext(MoviesContext);

  if (error) {
    return <Error title={error.message} statusCode={error.code} />;
  }

  return <>{children}</>;
}
