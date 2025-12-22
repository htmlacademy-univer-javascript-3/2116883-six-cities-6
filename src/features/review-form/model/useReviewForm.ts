import { useState, type ChangeEvent } from 'react';

const MIN_REVIEW_LENGTH = 50;

type ReviewFormState = {
  rating: string;
  comment: string;
};

export const useReviewForm = () => {
  const [formData, setFormData] = useState<ReviewFormState>({
    rating: '',
    comment: '',
  });

  const handleRatingChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      rating: event.target.value,
    }));
  };

  const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      comment: event.target.value,
    }));
  };

  const isSubmitDisabled =
    formData.rating === '' || formData.comment.length < MIN_REVIEW_LENGTH;

  return {
    formData,
    handleRatingChange,
    handleCommentChange,
    isSubmitDisabled,
  };
};
