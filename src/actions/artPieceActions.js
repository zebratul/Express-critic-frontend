import axiosInstance from '../utils/axiosInstance';
import { FETCH_ART_PIECES, CREATE_ART_PIECE, CREATE_REVIEW, FETCH_TAGS, SET_DISPLAY_TAGS, UPDATE_REVIEW, DELETE_REVIEW  } from './types';

export const fetchArtPieces = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get('/api/artpieces');
    console.log(response);
    dispatch({ type: FETCH_ART_PIECES, payload: response.data });
  } catch (error) {
    console.error('Error fetching art pieces:', error);
  }
};

export const createReview = (review) => async (dispatch) => {
  try {
    await axiosInstance.post('/api/reviews', review);
    dispatch({ type: CREATE_REVIEW });
  } catch (error) {
    console.error('Error creating review:', error);
  }
};

export const updateReview = (reviewId, review) => async (dispatch) => {
  try {
    await axiosInstance.put(`/api/reviews/${reviewId}`, review);
    dispatch({ type: UPDATE_REVIEW });
  } catch (error) {
    console.error('Error updating review:', error);
  }
};

export const deleteReview = (reviewId) => async (dispatch) => {
  try {
    await axiosInstance.delete(`/api/reviews/${reviewId}`);
    dispatch({ type: DELETE_REVIEW, payload: reviewId });
  } catch (error) {
    console.error('Error deleting art piece:', error);
  }
};

export const fetchTags = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get('/api/tags');
    dispatch({ type: FETCH_TAGS, payload: response.data });
  } catch (error) {
    console.error('Error fetching tags:', error);
  }
};

export const setDisplayTags = (displayTags) => {
  return { type: SET_DISPLAY_TAGS, payload: displayTags };
};
