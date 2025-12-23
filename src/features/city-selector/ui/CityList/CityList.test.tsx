import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
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

  it('calls onCitySelect when city is clicked', () => {
    const handleCitySelect = vi.fn();
    render(
      <CityList
        cities={['Paris', 'Cologne']}
        activeCity="Paris"
        onCitySelect={handleCitySelect}
      />
    );

    fireEvent.click(screen.getByText('Cologne'));

    expect(handleCitySelect).toHaveBeenCalledWith('Cologne');
  });
});
