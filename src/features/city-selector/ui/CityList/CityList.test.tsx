import { render, screen } from '@testing-library/react';
import CityList from './CityList';

describe('CityList', () => {
  it('renders cities and marks the active one', () => {
    render(
      <CityList
        cities={['Paris', 'Cologne']}
        activeCity="Cologne"
        onCitySelect={() => undefined}
      />
    );

    const activeLink = screen.getByText('Cologne').closest('a');
    expect(activeLink).toHaveClass('tabs__item--active');
    expect(screen.getByText('Paris')).toBeInTheDocument();
  });
});
