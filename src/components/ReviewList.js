import { React, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import ReviewTabs from './ReviewTabs';
import LatestReviews from './tabs/LatestReviews';
import PopularReviews from './tabs/PopularReviews';
import MyReviews from './tabs/MyReviews';
import TagReviews from './tabs/TagReviews';
import CreateReviewModal from './CreateReviewModal';
import SearchResults from './tabs/SearchResults';

const ReviewList = () => {
    const [activeTabKey, setActiveTabKey] = useState("latest");
    const searchResults = useSelector((state) => state.searchReviews.reviews);

    useEffect(() => {
        if (searchResults.length > 0) {
          setActiveTabKey('searchResults');
        }
      }, [searchResults]);

    return (
    <Container>
      <ReviewTabs activeTabKey={activeTabKey} setActiveTabKey={setActiveTabKey}/>
      <LatestReviews activeTabKey={activeTabKey}/>
      <PopularReviews activeTabKey={activeTabKey}/>
      <MyReviews activeTabKey={activeTabKey}/>
      <TagReviews activeTabKey={activeTabKey}/>
      <CreateReviewModal activeTabKey={activeTabKey}/>
      <SearchResults activeTabKey={activeTabKey}/>
    </Container>
  );
};

export default ReviewList;
