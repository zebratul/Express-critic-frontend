
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';
import { fetchReviews, fetchReviewsByLikes, clearReviews, fetchMyReviews  } from '../actions/reviewActions';
import { fetchTags, setDisplayTags } from '../actions/artPieceActions';
import { searchReviews } from '../actions/searchActions';
import { clearSearchResults } from '../actions/searchActions';
import { useTranslation } from 'react-i18next';

const ReviewTabs = ({ activeTabKey, setActiveTabKey }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const searchResults = useSelector((state) => state.searchReviews.reviews);

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);
  
  const handleSelect = (key) => {
    setActiveTabKey(key);
    switch (key) {
        case 'latest':
            dispatch(clearReviews());
            // dispatch(fetchReviews(1,10));
            // dispatch(setDisplayTags(false));
            dispatch(clearSearchResults());
            break;
        case 'popular':
            dispatch(clearReviews());
            dispatch(fetchReviewsByLikes());
            // dispatch(setDisplayTags(false));
            dispatch(clearSearchResults());
            break;
        case 'tags':
            dispatch(clearReviews());
            // dispatch(fetchTags());
            // dispatch(setDisplayTags(true));
            dispatch(clearSearchResults());
            break;
        case 'myReviews':
            dispatch(clearReviews());
            // dispatch(fetchMyReviews(user.id, 1, 10));
            // dispatch(setDisplayTags(false));
            break;
        case 'searchResults':
            dispatch(clearReviews());
            // dispatch(setDisplayTags(false));
            break;
        default:
            break;
    }
  };

  return (
    <Tabs activeKey={activeTabKey} id="review-tabs" onSelect={handleSelect}>
        <Tab eventKey="latest" title={t('latest')} />
        <Tab eventKey="popular" title={t('popular')} />
        <Tab eventKey="myReviews" title={t('myReviews')} />
        <Tab eventKey="tags" title={t('tags')} />
        {searchResults.length > 0 && <Tab eventKey="searchResults" title={t('yourSearchResults')} />}
    </Tabs>
  );
  
};

export default ReviewTabs;
