import axiosInstance from '../utils/axiosInstance';
import { SEARCH_REVIEWS_REQUEST, SEARCH_REVIEWS_SUCCESS, SEARCH_REVIEWS_FAIL, CLEAR_SEARCH_RESULTS } from './types';

export const searchReviews = (query) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_REVIEWS_REQUEST });

    const { data } = await axiosInstance.get(`/api/search?query=${query}`);

    dispatch({
      type: SEARCH_REVIEWS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SEARCH_REVIEWS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const clearSearchResults = () => {
  return {
    type: CLEAR_SEARCH_RESULTS,
  };
};


