import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReviews } from '../../actions/reviewActions';
import { Spinner } from 'react-bootstrap';
import ReviewCard from '../ReviewCard';
import InfiniteScroll from 'react-infinite-scroll-component';


const LatestReviews = ({ activeTabKey }) => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.reviews);
  const totalReviews = useSelector((state) => state.reviews.totalReviews);
  const isLoading = useSelector((state) => state.reviews.isLoading);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (activeTabKey === 'latest') {
      dispatch(fetchReviews(1, 10));
    }
  }, [dispatch, activeTabKey]);

  const fetchMoreData = () => {
    if (reviews.length >= totalReviews) {
      setHasMore(false);
      return;
    }

    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    dispatch(fetchReviews(nextPage, 10));
  };

  if (activeTabKey !== 'latest') {
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
    <InfiniteScroll
      dataLength={reviews.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<h4>...</h4>}
      endMessage={<p>~</p>}
    >
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </InfiniteScroll>
    )
  );
};

export default LatestReviews;
