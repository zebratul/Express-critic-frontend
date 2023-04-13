// src/components/ReviewList.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { fetchReviews } from '../actions/reviewActions';

const ReviewList = () => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(fetchReviews());
    console.log(reviews);
  }, [dispatch]);

  return (
    <Container>
      <Row>
        {reviews.map((review) => (
          <Col md={4} key={review.id}>
            <Card>
              <Card.Header>{review.review_name}</Card.Header>
              <Card.Body>
                <Card.Text>{review.review_text}</Card.Text>
                <Button variant="primary">View Review</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ReviewList;
