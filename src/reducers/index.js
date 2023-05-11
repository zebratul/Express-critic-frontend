import { combineReducers } from 'redux';
import authReducer from './authReducer';
import reviewReducer from './reviewReducer';
import artPieceReducer from './artPieceReducer';
import searchReviewsReducer from './searchReducer';
import modalReducer from './modalReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    reviews: reviewReducer,
    artpieces: artPieceReducer,
    searchReviews: searchReviewsReducer,
    modals: modalReducer,
});

export default rootReducer;
