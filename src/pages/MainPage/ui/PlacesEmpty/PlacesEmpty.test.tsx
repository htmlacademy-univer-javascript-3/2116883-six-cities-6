import { render, screen } from '@testing-library/react';
import PlacesEmpty from './PlacesEmpty';

describe('PlacesEmpty', () => {
  it('renders empty state with city name', () => {
    render(<PlacesEmpty cityName="Dusseldorf" />);

    expect(
      screen.getByText(/No places to stay available/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/property available at the moment in Dusseldorf/i)
    ).toBeInTheDocument();
  });
});
