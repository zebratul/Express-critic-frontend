// // src/components/ReviewList.js

//abandon hope

// import React, { useEffect, useState, useRef } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Container, Button, Modal, Spinner } from 'react-bootstrap';
// import { fetchReviews, setReviewsLoading, fetchMyReviews  } from '../actions/reviewActions';
// import { showCreateReviewModal, hideCreateReviewModal } from '../actions/modalActions';
// import { setDisplayTags } from '../actions/artPieceActions';
// import { searchReviews } from '../actions/searchActions';
// import InfiniteScroll from 'react-infinite-scroll-component';
// import ReviewCard from './ReviewCard';
// import CreateReview from './CreateReview';
// import ReviewTabs from './ReviewTabs';
// import axiosInstance from '../utils/axiosInstance';
// import styles from './ReviewList.module.css';
// import { useTranslation } from 'react-i18next';

// const ReviewList = () => {
//   const { t } = useTranslation();
//   const dispatch = useDispatch();
//   const reviews = useSelector((state) => state.reviews.reviews);
//   const totalReviews = useSelector((state) => state.reviews.totalReviews);
//   const createReviewModalVisible = useSelector((state) => state.modals.createReviewModalVisible);
//   const isLoading = useSelector((state) => state.reviews.isLoading);
//   const tags = useSelector((state) => state.artpieces.tags);
//   const displayTags = useSelector((state) => state.artpieces.displayTags);
//   const searchResults = useSelector((state) => state.searchReviews.reviews);
//   const searchLoading = useSelector((state) => state.searchReviews.loading);
//   const editMode = useSelector((state) => state.reviews.editMode);
//   const initialReviewData = useSelector((state) => state.reviews.initialReviewData);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [initialDataFetched, setInitialDataFetched] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const [myReviews, setMyReviews] = useState([]);
//   const [pageLimit, setPageLimit] = useState(10);
//   const [activeTabKey, setActiveTabKey] = useState("latest");
//   const user = useSelector((state) => state.auth.user);
  
//   useEffect(() => {
//     if (activeTabKey === "myReviews") {
//       setMyReviews(reviews);
//     }
//   }, [reviews, activeTabKey]);

//   useEffect(() => {
//       console.log("sending the initial request...");
//       dispatch(fetchReviews(1, pageLimit));
//       setInitialDataFetched(true);
//       setCurrentPage(1);
//   }, []);
  
//   const fetchMoreData = () => {
//     if (reviews.length >= totalReviews) {
//       setHasMore(false);
//       return;
//     }
  
//     const nextPage = currentPage + 1;
//     setCurrentPage(nextPage);

//     switch (activeTabKey) {
//       case "latest":
//         dispatch(fetchReviews(nextPage, pageLimit));
//         break;
//       case "popular":
//         // Fetch popular reviews
//         break;
//       case "myReviews":
//         dispatch(fetchMyReviews(user.id, nextPage, pageLimit));
//         break;
//       case "tags":
//         // Fetch reviews by tags
//         break;
//       default:
//         break;
//     }
//   };
  
  
//   const logReviews = () => {
//     console.log(reviews);
//     console.log(totalReviews);
//     console.log("edit mode", editMode);
//   };

//   const handleTagClick = (tagName) => {
//     dispatch(setDisplayTags(false));
//     performSearch(tagName);
//   };
  
//   const performSearch = async (query) => {
//     dispatch(searchReviews(query));
//   };

//   const fetchReviewsPerId = async () => {
//     try {
//       const response = await axiosInstance.get('/api/reviews/4');
//       console.log(response.data);
//     } catch (error) {
//       console.error('Error fetching reviews:', error);
//     }
//   };

//   const maxUsageCount = Math.max(...tags.map((tag) => tag.usageCount));

//   const getFontSizeBasedOnUsage = (usageCount) => {
//     const minFontSize = 12;
//     const maxFontSize = 48;
//     const scaleFactor = (maxFontSize - minFontSize) / maxUsageCount;
//     return minFontSize + scaleFactor * usageCount;
//   };
  

//   return (
//     <Container>
//       <div className="mb-3">
//         {/* <Button variant="info" onClick={logReviews}>
//           Log Reviews
//         </Button> */}
//         <ReviewTabs activeTabKey={activeTabKey} setActiveTabKey={setActiveTabKey} />
//       </div>
      // {isLoading ? (
      //   <div className="text-center">
      //     <Spinner animation="border" role="status">
      //       <span className="sr-only"></span>
      //     </Spinner>
      //   </div>
//       ) : displayTags ? (
//         <div className="tags-container">
//             {tags.map((tag) => (
//               <button
//                 key={tag.id}
//                 className="tag"
//                 onClick={() => handleTagClick(tag.name)}
//                 style={{
//                   background: "none",
//                   border: "none",
//                   textDecoration: "underline",
//                   cursor: "pointer",
//                   fontSize: `${getFontSizeBasedOnUsage(tag.usageCount)}px`,
//                 }}
//               >
//                 {tag.name}
//               </button>
//             ))}
//         </div>
//       ) : searchLoading ? (
//         <div className="text-center">
//           <Spinner animation="border" role="status">
//             <span className="sr-only"></span>
//           </Spinner>
//         </div>
//       ) : (
//         <>
//           {searchResults.length > 0 && <h2>Your search results</h2>}
//           {searchResults.length > 0 ? (
//             searchResults.map((review) => <ReviewCard key={review.id} review={review} />)
//           ) : activeTabKey === "myReviews" ? (
//             myReviews.map((review) => <ReviewCard key={review.id} review={review} />)
//           ) : (
//             <InfiniteScroll
//               dataLength={reviews.length}
//               next={fetchMoreData}
//               hasMore={hasMore}
//               loader={<Spinner animation="border" role="status"><span className="sr-only"></span></Spinner>}
//               endMessage={
//                 <p style={{ textAlign: 'center' }}>
//                   <b>~</b>
//                 </p>
//               }
//             >
//               {reviews.map((review) => <ReviewCard key={review.id} review={review} />)}
//             </InfiniteScroll>

//           )}
//         </>
//       )}
//       <Modal
//         show={createReviewModalVisible}
//         onHide={() => dispatch(hideCreateReviewModal())}
//         dialogClassName={styles.largeModal}
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>{t("createReview")}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <CreateReview editMode={editMode} initialReviewData={initialReviewData} />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => dispatch(hideCreateReviewModal())}>
//             {t("close")}
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };

// export default ReviewList;
