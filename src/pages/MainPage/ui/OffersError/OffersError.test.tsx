import { render, screen } from '@testing-library/react';
import OffersError from './OffersError';

describe('OffersError', () => {
  it('renders error message', () => {
    render(<OffersError message="Server is unavailable." />);

    expect(
      screen.getByText(/unable to load offers/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/server is unavailable/i)).toBeInTheDocument();
  });
});
