import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Home from '.';

expect.extend(toHaveNoViolations);

const movieActions = {
  getAllMovies: () => null,
  updateMovieState: (id: string, saved: boolean, watched: boolean) => null,
};

describe('<Home/>', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<Home movieActions={movieActions} />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});

describe('/', () => {
  it('should render the homepage', () => {
    const { container } = render(<Home movieActions={movieActions} />);
    expect(container).toMatchInlineSnapshot(`
      <div>
        <main
          class="home-page"
        >
          <div
            class="movie-count"
          >
            <h2>
              Movies
            </h2>
            <span>
              (0)
            </span>
          </div>
          <div
            class="home-page__grid-container"
          >
            <div
              class="home-page__grid"
            />
          </div>
        </main>
      </div>
    `);
  });
});
