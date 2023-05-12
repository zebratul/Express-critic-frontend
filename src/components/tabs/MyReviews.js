import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMyReviews } from '../../actions/reviewActions';
import { searchReviews } from '../../actions/searchActions';
import { Spinner } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import ReviewCard from '../ReviewCard';
import { useTranslation } from 'react-i18next';

const MyReviews = ({ activeTabKey }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const userReviews = useSelector((state) => state.reviews.myReviews);
  const isLoading = useSelector((state) => state.reviews.isLoading);
  const totalReviews = useSelector((state) => state.reviews.totalReviews);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (activeTabKey === 'myReviews') {
      dispatch(searchReviews(user.username));
    }
  }, [dispatch, activeTabKey]);

  //no matter what i did here i couldn't manage to render the reviews by user ID from the database. Cause unclear. Resorted to stop-gapping it with a search by user.

  // useEffect(() => {
  //   if (user && activeTabKey === 'myReviews') {
  //     dispatch(fetchMyReviews(user.id, 1, 10));
  //   }
  // }, [dispatch, user, activeTabKey]);

  // const printState = () => {
  //   console.log(userReviews);
  // }

  // const fetchMoreData = () => {
  //   if (userReviews.length >= totalReviews) {
  //     setHasMore(false);
  //     return;
  //   }

  //   const nextPage = currentPage + 1;
  //   setCurrentPage(nextPage);
  //   dispatch(fetchMyReviews(nextPage, 10));
  // };

  // if (activeTabKey !== 'myReviews') {
  //   return null;
  // } 

  // if (!user) {
  //   return <p>{t('login')}</p>;
  // }

  return (
    <></>
  );
};

export default MyReviews;
