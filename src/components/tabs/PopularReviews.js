import React, { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReviewsByLikes } from '../../actions/reviewActions';
import ReviewCard from '../ReviewCard';

const PopularReviews = ({ activeTabKey }) => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.reviews);
  const isLoading = useSelector((state) => state.reviews.isLoading);

  useEffect(() => {
    if (activeTabKey === 'popular') {
      dispatch(fetchReviewsByLikes());
    }
  }, [dispatch, activeTabKey]);

  if (activeTabKey !== 'popular') {
    return null;
  }

  return (
    isLoading ? (
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="sr-only">...</span>
        </Spinner>
      </div>
    ) : (
      <div>
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    )
  );
};

export default PopularReviews;
