const initialState = [];

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_REVIEWS':
      return action.payload;
    default:
      return state;
  }
};

export default reviewReducer;
