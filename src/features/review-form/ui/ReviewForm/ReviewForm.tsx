import {
  Fragment,
  useState,
  type FC,
  type FormEvent,
  type ChangeEvent,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MAX_REVIEW_LENGTH, useReviewForm } from '../../model/useReviewForm';
import type { AppDispatch } from '../../../../store';
import { postCommentAction } from '../../../../store/api-actions';
import { selectCommentPosting } from '../../../../store/selectors';

const ratingOptions = [
  { value: '5', title: 'perfect', id: '5-stars' },
  { value: '4', title: 'good', id: '4-stars' },
  { value: '3', title: 'not bad', id: '3-stars' },
  { value: '2', title: 'badly', id: '2-stars' },
  { value: '1', title: 'terribly', id: '1-star' },
];

type ReviewFormProps = {
  offerId: string;
};

const ReviewForm: FC<ReviewFormProps> = ({ offerId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const isPosting = useSelector(selectCommentPosting);
  const {
    formData,
    handleRatingChange,
    handleCommentChange,
    isSubmitDisabled,
    resetForm,
  } = useReviewForm();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitDisabled || isPosting) {
      return;
    }

    void (async () => {
      let isSuccess = false;

      try {
        const result = await dispatch(
          postCommentAction(offerId, {
            comment: formData.comment,
            rating: Number(formData.rating),
          })
        );

        isSuccess = result === true;
      } catch {
        isSuccess = false;
      }

      if (isSuccess) {
        setSubmitError(null);
        resetForm();
        return;
      }

      setSubmitError('Failed to submit review. Please try again.');
    })();
  };

  const isFormDisabled = isSubmitDisabled || isPosting;
  const handleRatingSelect = (event: ChangeEvent<HTMLInputElement>) => {
    setSubmitError(null);
    handleRatingChange(event);
  };
  const handleCommentUpdate = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setSubmitError(null);
    handleCommentChange(event);
  };

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {ratingOptions.map((option) => (
          <Fragment key={option.value}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={option.value}
              id={option.id}
              type="radio"
              checked={formData.rating === option.value}
              onChange={handleRatingSelect}
              disabled={isPosting}
            />
            <label
              htmlFor={option.id}
              className="reviews__rating-label form__rating-label"
              title={option.title}
            >
              <svg className="form__star-image" width={37} height={33}>
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.comment}
        onChange={handleCommentUpdate}
        disabled={isPosting}
        maxLength={MAX_REVIEW_LENGTH}
      />
      {submitError && (
        <p className="reviews__error" role="alert">
          {submitError}
        </p>
      )}
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isFormDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
