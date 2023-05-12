import { TOGGLE_REVIEW_LIKE, CREATE_COMMENT, RATE_ART_PIECE, TOGGLE_COMMENT_LIKE, FETCH_REVIEWS, FETCH_REVIEWS_BY_LIKES, SET_REVIEWS_LOADING, CLEAR_REVIEWS, SET_EDIT_MODE, SET_INITIAL_REVIEW_DATA, FETCH_MY_REVIEWS   } from '../actions/types';

const initialState = {
    reviews: [],
    totalReviews: 0,
    isLoading: false,
    editMode: false,
    initialReviewData: {
        review_name: '',
        review_text: '',
        image_url: '',
        grade: 0,
        tags: [],
        category: '',
        release_date: '',
    },
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
        case FETCH_REVIEWS:
            return {
                ...state,
                reviews: [...state.reviews, ...action.payload.data],
                totalReviews: action.payload.totalReviews,
                hasMoreData: action.payload.hasMoreData,
            };
      case TOGGLE_REVIEW_LIKE:
          const { reviewId: likeReviewId, likedReview } = action.payload;
          return {
              ...state,
              reviews: state.reviews.map((review) =>
                  review.id === likeReviewId ? likedReview : review
              ),
          };
      case CREATE_COMMENT:
          const { reviewId: commentReviewId, comment } = action.payload;
          return {
              ...state,
              reviews: state.reviews.map((review) =>
                  review.id === commentReviewId
                      ? { ...review, comments: [...review.comments, comment] }
                      : review
              ),
          };
      case RATE_ART_PIECE:
          const { artPieceId, ratedArtPiece, userId } = action.payload;
          return {
              ...state,
              reviews: state.reviews.map((review) =>
                  review.art_piece.id === artPieceId
                      ? {
                          ...review,
                          art_piece: {
                              ...review.art_piece,
                              ratings: ratedArtPiece.ratings,
                          },
                          ratings: review.ratings.filter(
                              (rating) => rating.user_id !== userId
                          ).concat({
                              user_id: userId,
                              rating: ratedArtPiece.userRating,
                          }),
                      }
                      : review
              ),
          };
      case TOGGLE_COMMENT_LIKE:
          const { reviewId: likeCommentReviewId, commentId, likedComment } = action.payload;
              return {
                ...state,
                reviews: state.reviews.map((review) =>
                  review.id === likeCommentReviewId
                    ? {
                        ...review,
                        comments: review.comments.map((comment) =>
                          comment.id === commentId ? likedComment : comment
                        ),
                      }
                    : review
                ),
              };        
      case FETCH_REVIEWS_BY_LIKES:
          return {
              ...state,
              reviews: action.payload,
          };
      case FETCH_MY_REVIEWS:
          return {
              ...state,
              myReviews: [...state.myReviews, ...action.payload.data],
              totalReviews: action.payload.totalReviews,
              hasMoreData: action.payload.hasMoreData,
          };
      case SET_REVIEWS_LOADING:
          return {
              ...state,
              isLoading: action.payload,
          };
      case CLEAR_REVIEWS:
          return {
              ...state,
              reviews: [],
              totalReviews: 0,
              hasMoreData: true,
          };
      case SET_EDIT_MODE:
          return {
              ...state,
              editMode: action.payload,
          };
      case SET_INITIAL_REVIEW_DATA:
          return {
              ...state,
              initialReviewData: action.payload,
          };
      default:
          return state;
  }
};

export default reviewReducer;
