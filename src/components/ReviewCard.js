import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Row, Col, Form, Button } from 'react-bootstrap'; // Import Form and Button
import { FaHeart, FaStar, FaStarHalf, FaRegStar, FaRegHeart, FaEdit, FaTrash } from 'react-icons/fa';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import ReactMarkdown from 'react-markdown';
import { toggleReviewLike, createComment, rateArtPiece, toggleCommentLike } from '../actions/reviewActions'; // Add rateArtPiece here
import { deleteReview } from '../actions/artPieceActions';
import { setEditMode, setInitialReviewData } from '../actions/reviewActions';
import { showCreateReviewModal } from '../actions/modalActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';

const ReviewCard = ({ review }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { art_piece } = review;
  const [showComments, setShowComments] = useState(false);
  const [isReviewLiked, setIsReviewLiked] = useState(false);
  const [currentUserRating, setCurrentUserRating] = useState(null);
  const [likeCount, setLikeCount] = useState(review.liked_by_users.length);
  const [commentText, setCommentText] = useState('');
  const userInfo = useSelector((state) => state.auth.user);
  

  useEffect(() => {
    setIsReviewLiked(hasUserLikedReview());
    setLikeCount(review.liked_by_users.length);
    setCurrentUserRating(getCurrentUserRating());
  }, [userInfo, review, art_piece]);
  
  const handleRating = async (rating) => {
    if (userInfo) {
      await dispatch(rateArtPiece(review.art_piece.id, rating));
      setCurrentUserRating(rating);
    } else {
      showLoginAlert();
    }
  };
  
  const handleCommentLike = (commentId) => {
    if (userInfo) {
      dispatch(toggleCommentLike(review.id, commentId));
    } else {
      showLoginAlert();
    }
  };

  const handleEditReview = () => {
    dispatch(setEditMode(true));
    dispatch(setInitialReviewData(review));
    dispatch(showCreateReviewModal());
  };

  const handleDeleteReview = () => {
    if (window.confirm(t('deleteReviewConfirmation'))) {
      dispatch(deleteReview(review.id));
    }
  };
  

  const showLoginAlert = () => {
    toast.error('Please log in to perform this action.', {
      position: toast.POSITION.BOTTOM_LEFT,
      autoClose: 3000,
    });
  };
  

  const renderRatingStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (currentUserRating && i <= currentUserRating) {
        stars.push(
          <AiFillStar
            key={i}
            size={24}
            className="text-warning cursor-pointer"
            onClick={() => handleRating(i)}
          />
        );
      } else {
        stars.push(
          <AiOutlineStar
            key={i}
            size={24}
            className="text-warning cursor-pointer"
            onClick={() => handleRating(i)}
          />
        );
      }
    }
    return stars;
  };

  const getCurrentUserRating = () => {
    if (!userInfo) return false;
    const userRating = art_piece.ratings.find((rating) => rating.user_id === userInfo.id);
    return userRating ? userRating.rating : null;
  };
  
  const handleLike = () => {
    if (userInfo) {
      dispatch(toggleReviewLike(review.id));
      setIsReviewLiked(!isReviewLiked);
  
      if (isReviewLiked) {
        setLikeCount(likeCount - 1);
      } else {
        setLikeCount(likeCount + 1);
      }
    } else {
      showLoginAlert();
    }
  };
  
  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (userInfo) {
      dispatch(createComment(review.id, commentText));
      setCommentText(''); 
    } else {
      showLoginAlert();
    }
  };

  const hasUserLikedReview = () => {
    if (!userInfo) return false;
    return review.liked_by_users.some((user) => user.id === userInfo.id);
  };

  const hasUserLikedComment = (comment) => {
    if (!userInfo) return false;
    return comment.liked_by_users.some((user) => user.id === userInfo.id);
  };
  

  const averageRating = () => {
    if (review.art_piece.ratings.length === 0) {
      return '0';
    }
  
    const totalRatings = review.art_piece.ratings.reduce((sum, rating) => sum + rating.rating, 0);
    const average = totalRatings / review.art_piece.ratings.length;
    return average.toFixed(1) + "/5";
  };
    
  const renderStars = (grade) => {
    const stars = [];
    for (let i = 1; i <= 10; i++) {
      if (grade >= i) {
        stars.push(<FaStar key={i} className="text-warning" />);
      } else if (grade >= i - 0.5) {
        stars.push(<FaStarHalf key={i} className="text-warning" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-warning" />);
      }
    }
    return stars;
  };

  return (
    <div className="mb-3">
      <ToastContainer />
      <Card>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <span>{review.review_name}</span>
          <span className="mx-2">-</span>
          <span style={{ fontWeight: "bold" }}>
            {review.art_piece.name} ({review.art_piece.release_date}){" "}
          </span>
        </div>
        <div className="d-flex align-items-center">
          <span className="ml-2">
            {review.grade} {<FaStar className="text-warning" />}
          </span>
          {(userInfo && (userInfo.id === review.author.id || userInfo.is_admin === "true")) && (
            <>
              <FaEdit
                className="ml-2 cursor-pointer"
                onClick={handleEditReview}
              />
              <FaTrash
                className="ml-2 cursor-pointer text-danger"
                onClick={handleDeleteReview}
              />
            </>
          )}
        </div>
      </Card.Header>

        <Card.Body>
          <Row>
            <Col md={8}>
              <ReactMarkdown children={review.review_text} />
              <div className="mb-3">
                <span className="text-muted small">{review.author.username}</span>
              </div>
              <div className="mb-2 d-flex align-items-center">
                <div>{renderRatingStars()}</div>
                <span className="text-muted small mr-2">{averageRating()}</span>
              </div>
              <div className="mb-2">
                <span className="text-muted small">{review.tags.map(tag => tag.name).join(', ')}</span>
              </div>
              <div className="d-flex align-items-center mb-2">
                {isReviewLiked ? (
                  <FaHeart className="text-danger cursor-pointer" onClick={handleLike} />
                ) : (
                  <FaRegHeart className="text-danger cursor-pointer" onClick={handleLike} />
                )}
                <span className="text-muted small ml-1">{likeCount}</span>
                <span className="text-primary small ml-3 cursor-pointer" onClick={toggleComments}>
                   {t('comments')} ({review.comments.length})
                </span>
              </div>
            </Col>
            <Col md={4}>
              <img src={review.image_url} alt={review.art_piece.name} className="img-fluid rounded" />
            </Col>
          </Row>
          {showComments && (
            <div className="mt-3">
              <Form onSubmit={handleCommentSubmit} className="mb-3">
                <Form.Group controlId="commentText" className="d-flex">
                  <Form.Control
                    type="text"
                    placeholder={t("commentPlaceholder")}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                  <Button variant="primary" type="submit" className="ml-2">
                  {t('submit')}
                  </Button>
                </Form.Group>
              </Form>
              {review.comments
                .slice()
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((comment) => (
                  <Card key={comment.id} className="mb-2">
                    <Card.Body>
                      <Card.Text>{comment.text}</Card.Text>
                      <div className="d-flex justify-content-between">
                        <span className="text-muted small">{comment.author.username}</span>
                        <span className="text-muted small">
                          {new Date(comment.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <div className="d-flex align-items-center mt-2">
                      {hasUserLikedComment(comment) ? (
                            <FaHeart className="text-danger cursor-pointer" onClick={() => handleCommentLike(comment.id)} />
                          ) : (
                            <FaRegHeart className="text-danger cursor-pointer" onClick={() => handleCommentLike(comment.id)} />
                          )}
                        <span className="text-muted small ml-1">{comment.liked_by_users.length}</span>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
   
};

export default ReviewCard;
