import { FETCH_ART_PIECES, CREATE_ART_PIECE, FETCH_TAGS, SET_DISPLAY_TAGS, UPDATE_REVIEW, DELETE_REVIEW   } from '../actions/types';

const initialState = {
    artPieces: [],
    tags: [],
    displayTags: false,
};

const artPieceReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ART_PIECES:
            return {
                ...state,
                artPieces: action.payload,
            };
        case CREATE_ART_PIECE:
            return {
                ...state,
                artPieces: [...state.artPieces, action.payload],
            };
        case FETCH_TAGS:
            return {
                ...state,
                tags: action.payload,
            };
        case SET_DISPLAY_TAGS:
              return {
                  ...state,
                  displayTags: action.payload,
              };
         case UPDATE_REVIEW:
              return {
                  ...state,
                  // user: {
                  //   ...state.user,
                  //   reviews: state.auth.user.reviews.map(review => review.id === action.payload.review.id ? action.payload.review : review),
                  // },
              };
          case DELETE_REVIEW:
              return {
                  ...state,
                  reviews: state.reviews.reviews.filter((review) => review.id !== action.payload),
              };
          default:
              return state;
    }
};

export default artPieceReducer;
