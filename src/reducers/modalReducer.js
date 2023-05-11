import { SHOW_CREATE_REVIEW_MODAL, HIDE_CREATE_REVIEW_MODAL } from '../actions/modalActions';

const initialState = {
    createReviewModalVisible: false,
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
      case SHOW_CREATE_REVIEW_MODAL:
          return {
              ...state,
              createReviewModalVisible: true,
        };
      case HIDE_CREATE_REVIEW_MODAL:
          return {
              ...state,
              createReviewModalVisible: false,
          };
      default:
          return state;
  }
};

export default modalReducer;