import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import ReviewForm from './ReviewForm';
import { postCommentAction } from '../../../../store/api-actions';

const dispatchMock = vi.fn().mockResolvedValue(true);

vi.mock('react-redux', () => ({
  useDispatch: () => dispatchMock,
  useSelector: () => false,
}));

vi.mock('../../../../store/api-actions', () => ({
  postCommentAction: vi.fn(() => ({ type: 'post' })),
}));

const postCommentActionMock = vi.mocked(postCommentAction);

describe('ReviewForm', () => {
  it('submits comment when form is valid', async () => {
    render(<ReviewForm offerId="offer-1" />);

    fireEvent.click(screen.getByDisplayValue('5'));
    fireEvent.change(screen.getByPlaceholderText(/tell how was your stay/i), {
      target: { value: 'a'.repeat(50) },
    });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(postCommentActionMock).toHaveBeenCalledWith('offer-1', {
      comment: 'a'.repeat(50),
      rating: 5,
    });
    expect(dispatchMock).toHaveBeenCalledWith({ type: 'post' });

    await waitFor(() =>
      expect(
        screen.getByPlaceholderText(/tell how was your stay/i)
      ).toHaveValue('')
    );
  });
});
