import axiosInstance from '../utils/axiosInstance';
import { TOGGLE_REVIEW_LIKE, CREATE_COMMENT, RATE_ART_PIECE, TOGGLE_COMMENT_LIKE, FETCH_REVIEWS_BY_LIKES, FETCH_REVIEWS, SET_REVIEWS_LOADING, CLEAR_REVIEWS, SET_EDIT_MODE, SET_INITIAL_REVIEW_DATA, FETCH_MY_REVIEWS } from './types';

export const fetchReviews = (page, limit) => async (dispatch, getState) => {
  try {
    console.log("received a fetch request:", page, limit);
    dispatch(setReviewsLoading(true));
    const response = await axiosInstance.get(`/api/reviews?page=${page}&limit=${limit}`);
    console.log(response.data);
    const existingReviews = getState().reviews.reviews;
    dispatch({
      type: FETCH_REVIEWS,
      payload: {
        data: response.data.data,
        totalReviews: response.data.totalReviews,
        hasMoreData: response.data.data.length === limit,
      },
    });
    dispatch(setReviewsLoading(false));
  } catch (error) {
    console.error('Error fetching reviews:', error);
    dispatch(setReviewsLoading(false));
  }
};


export const clearReviews = () => {
  return {
    type: CLEAR_REVIEWS,
  };
};


export const fetchReviewsByLikes = () => async (dispatch) => {
  try {
    dispatch(setReviewsLoading(true));
    const response = await axiosInstance.get('/api/reviews/popular');
    dispatch({
      type: FETCH_REVIEWS_BY_LIKES,
      payload: response.data,
    });
    dispatch(setReviewsLoading(false));
  } catch (error) {
    console.error('Error fetching reviews by likes:', error);
    dispatch(setReviewsLoading(false));
  }
};

export const fetchMyReviews = (userId, page, limit) => async (dispatch) => {
  try {
    console.log(userId);
    dispatch(setReviewsLoading(true));
    const response = await axiosInstance.get(`/api/reviews/myreviews?userId=${userId}&page=${page}&limit=${limit}`);
    dispatch({ 
      type: FETCH_MY_REVIEWS, 
      payload: {
        data: response.data.data,
        totalReviews: response.data.totalReviews,
        hasMoreData: response.data.data.length === limit,
      }
    });
  } catch (error) {
    console.error('Error fetching my reviews:', error);
    dispatch(setReviewsLoading(false));
  }
};

export const setReviewsLoading = (isLoading) => ({
  type: SET_REVIEWS_LOADING,
  payload: isLoading,
});

export const toggleReviewLike = (reviewId) => async (dispatch, getState) => {
  try {
    const { data } = await axiosInstance.put(`/api/reviews/${reviewId}/like`, {});

    dispatch({ type: TOGGLE_REVIEW_LIKE, payload: { reviewId, likedReview: data } });
  } catch (error) {
    console.error('Error leaving a like:', error);
  }
};

export const createComment = (reviewId, text) => async (dispatch) => {
  try {
    const { data } = await axiosInstance.post('/api/reviews/comments', { reviewId, text });

    dispatch({ type: CREATE_COMMENT, payload: { reviewId, comment: data } });
  } catch (error) {
    console.error('Error creating comment:', error);
  }
};

export const rateArtPiece = (artPieceId, rating) => async (dispatch, getState) => {
  try {
    const { data } = await axiosInstance.post(`/api/art-pieces/${artPieceId}/rating`, { rating });

    dispatch({ type: RATE_ART_PIECE, payload: { artPieceId, ratedArtPiece: data } });
  } catch (error) {
    console.error('Error rating art piece:', error);
  }
};

export const toggleCommentLike = (reviewId, commentId) => async (dispatch, getState) => {
  try {
    const { data } = await axiosInstance.put(`/api/reviews/comments/${commentId}/like`, {});

    dispatch({ type: TOGGLE_COMMENT_LIKE, payload: { reviewId, commentId, likedComment: data } });
  } catch (error) {
    console.error('Error leaving a like on comment:', error);
  }
};

export const setEditMode = (editMode) => {
  return {
    type: SET_EDIT_MODE,
    payload: editMode,
  };
};

export const setInitialReviewData = (initialReviewData) => {
  return {
    type: SET_INITIAL_REVIEW_DATA,
    payload: initialReviewData,
  };
};