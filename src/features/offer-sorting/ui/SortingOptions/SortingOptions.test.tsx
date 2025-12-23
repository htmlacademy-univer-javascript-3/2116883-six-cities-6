import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import SortingOptions from './SortingOptions';

describe('SortingOptions', () => {
  it('renders active sort type', () => {
    render(
      <SortingOptions activeSort="Popular" onSortChange={() => undefined} />
    );

    expect(
      screen.getByText('Popular', { selector: '.places__sorting-type' })
    ).toBeInTheDocument();
  });

  it('calls onSortChange when option is selected', () => {
    const handleSortChange = vi.fn();
    render(
      <SortingOptions activeSort="Popular" onSortChange={handleSortChange} />
    );

    fireEvent.click(screen.getByText('Price: low to high'));

    expect(handleSortChange).toHaveBeenCalledWith('Price: low to high');
  });
});
