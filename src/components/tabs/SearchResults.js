import React from 'react';
import { useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import ReviewCard from '../ReviewCard';

const SearchResults = ({ activeTabKey }) => {
  const searchResults = useSelector((state) => state.searchReviews.reviews);
  const searchLoading = useSelector((state) => state.searchReviews.loading);

  if (activeTabKey !== 'searchResults') {
    return null;
  } 

  return (
    searchLoading ? (
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="sr-only">...</span>
        </Spinner>
      </div>
    ) : (
      <>
        {searchResults.length > 0 ? (
          searchResults.map((review) => <ReviewCard key={review.id} review={review} />)
        ) : (
          <div>No search results</div>
        )}
      </>
    )
  );
};

export default SearchResults;
