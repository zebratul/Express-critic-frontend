import axios from 'axios';

export const fetchReviews = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:3001/api/reviews');
    dispatch({
      type: 'FETCH_REVIEWS',
      payload: response.data,
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
  }
};
