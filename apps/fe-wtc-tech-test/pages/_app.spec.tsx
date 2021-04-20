import React from 'react';
import App from './_app';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Home from '.';

expect.extend(toHaveNoViolations);

describe('<App/>', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<App Component={Home} pageProps={{}} />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
