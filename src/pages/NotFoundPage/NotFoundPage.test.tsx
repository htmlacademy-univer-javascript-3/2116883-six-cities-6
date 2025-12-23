import { render, screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import reducer from '../../store/reducer';

describe('NotFoundPage', () => {
  it('renders 404 message', () => {
    const store = configureStore({ reducer });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <NotFoundPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/404\. Page not found/i)).toBeInTheDocument();
  });
});
