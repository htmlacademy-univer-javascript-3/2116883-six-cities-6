import { renderHook, act } from '@testing-library/react';
import type { ChangeEvent } from 'react';
import { useReviewForm } from './useReviewForm';

describe('useReviewForm', () => {
  it('initializes with empty values and disabled submit', () => {
    const { result } = renderHook(() => useReviewForm());

    expect(result.current.formData).toEqual({ rating: '', comment: '' });
    expect(result.current.isSubmitDisabled).toBe(true);
  });

  it('updates form data and enables submit when valid', () => {
    const { result } = renderHook(() => useReviewForm());

    act(() => {
      result.current.handleRatingChange({
        target: { value: '4' },
      } as ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handleCommentChange({
        target: { value: 'a'.repeat(50) },
      } as ChangeEvent<HTMLTextAreaElement>);
    });

    expect(result.current.formData.rating).toBe('4');
    expect(result.current.formData.comment).toHaveLength(50);
    expect(result.current.isSubmitDisabled).toBe(false);
  });

  it('resets form data', () => {
    const { result } = renderHook(() => useReviewForm());

    act(() => {
      result.current.handleRatingChange({
        target: { value: '5' },
      } as ChangeEvent<HTMLInputElement>);
      result.current.handleCommentChange({
        target: { value: 'a'.repeat(50) },
      } as ChangeEvent<HTMLTextAreaElement>);
    });

    act(() => {
      result.current.resetForm();
    });

    expect(result.current.formData).toEqual({ rating: '', comment: '' });
    expect(result.current.isSubmitDisabled).toBe(true);
  });
});
