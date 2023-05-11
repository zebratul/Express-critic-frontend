import { SEARCH_REVIEWS_REQUEST, SEARCH_REVIEWS_SUCCESS, SEARCH_REVIEWS_FAIL, CLEAR_SEARCH_RESULTS } from '../actions/types';

const initialState = {
    loading: false,
    reviews: [],
    error: null,
};

const searchReviewsReducer = (state = initialState, action) => {
  switch (action.type) {
      case SEARCH_REVIEWS_REQUEST:
          return { ...state, loading: true };
      case SEARCH_REVIEWS_SUCCESS:
          return { ...state, loading: false, reviews: action.payload };
      case SEARCH_REVIEWS_FAIL:
          return { ...state, loading: false, error: action.payload };
      case CLEAR_SEARCH_RESULTS:
          return { ...state, reviews: [] };
      default:
          return state;
  }
};

export default searchReviewsReducer;
