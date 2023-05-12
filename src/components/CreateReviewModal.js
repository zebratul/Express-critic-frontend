import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { hideCreateReviewModal } from '../actions/modalActions';
import CreateReview from './CreateReview';
import { useTranslation } from 'react-i18next';
import styles from './ReviewList.module.css';

const CreateReviewModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const createReviewModalVisible = useSelector((state) => state.modals.createReviewModalVisible);
  const editMode = useSelector((state) => state.reviews.editMode);
  const initialReviewData = useSelector((state) => state.reviews.initialReviewData);

  return (
    <Modal
      show={createReviewModalVisible}
      onHide={() => dispatch(hideCreateReviewModal())}
      dialogClassName={styles.largeModal}
    >
      <Modal.Header closeButton>
        <Modal.Title>{t("createReview")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CreateReview editMode={editMode} initialReviewData={initialReviewData} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => dispatch(hideCreateReviewModal())}>
          {t("close")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateReviewModal;
