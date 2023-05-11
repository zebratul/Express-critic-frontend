import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchArtPieces, createArtPiece, createReview, fetchTags, updateReview } from '../actions/artPieceActions'; // Update this import
import { setEditMode } from '../actions/reviewActions';
import CloudinaryUploadWidget from '../utils/CloudinaryUploadWidget';
import Select from 'react-select';
import Creatable from 'react-select/creatable';
import StarRating from './StarRating';
import './CreateReview.css'; 
import MarkdownEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from 'react-bootstrap'; // Add this import
import { useTranslation } from 'react-i18next';


const CreateReview = ({ editMode, initialReviewData = {} }) => {
  const { t } = useTranslation(); 
  const dispatch = useDispatch();
  const artPieces = useSelector((state) => state.artpieces.artPieces);
  const fetchedTags = useSelector((state) => state.artpieces.tags); 
  const [newArtPieceReleaseDate, setNewArtPieceReleaseDate] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Add this state
  const [selectedArtPiece, setSelectedArtPiece] = useState(editMode ? initialReviewData.art_piece : null);
  const [newArtPieceName, setNewArtPieceName] = useState('');
  const [newArtPieceOptions, setNewArtPieceOptions] = useState([]);
  const {
    id,
    review_name,
    review_text,
    image_url,
    grade,
    tags, 
    category,
    art_piece
  } = initialReviewData || {};

  const extractedTagNames = tags?.map(tag => tag.name) || [];
  const extractedCategoryName = initialReviewData.art_piece?.category.name || '';
  const extractedReleaseDate = initialReviewData.art_piece?.release_date?.toString() || '';
  const extractedArtPieceName = initialReviewData.art_piece?.name?.toString() || '';

  const [reviewData, setReviewData] = useState(editMode ? {
    id,
    review_name,
    review_text,
    image_url,
    grade,
    tags: extractedTagNames,
    category: extractedCategoryName,
    release_date: extractedReleaseDate,
    art_piece: extractedArtPieceName,
  } : {
    review_name: '',
    review_text: '',
    image_url: '',
    grade: 0,
    tags: [],
    category: '',
    release_date: '',
  });
  


  useEffect(() => {
    dispatch(fetchArtPieces());
    dispatch(fetchTags()); 
  }, [dispatch]);

  const showLoginAlert = () => {
    toast.error('Please log in to perform this action.', {
      position: toast.POSITION.BOTTOM_LEFT,
      autoClose: 3000,
    });
  };

  const handleEditorChange = ({ text }) => {
    const markdownHtml = marked(text); 
    const sanitizedHtml = DOMPurify.sanitize(markdownHtml); 
    const sanitizedText = DOMPurify.sanitize(text); 
    const limitedText = sanitizedText.substring(0, 500); 
    setReviewData({ ...reviewData, review_text: limitedText });
  };
  
  const handleNewArtPieceReleaseDateChange = (event) => {
    const releaseDate = parseInt(event.target.value);
    setNewArtPieceReleaseDate(releaseDate);
  };
  
  const handleCategoryChange = (selectedOption) => {
    setReviewData({ ...reviewData, category: selectedOption.value });
  };
  
  
  const existingTags = fetchedTags.map((tag) => ({
    value: tag.id,
    label: tag.name,
  }));

  const getCategoryNameById = (categoryId) => {
    const categoryMap = {
      1: "Audio",
      2: "Video",
      3: "Text",
      4: "Picture",
      5: "Games",
    };
  
    return categoryMap[categoryId];
  };
  

  const options = [
    {
      value: 'create_new',
      label: 'Create a new art piece',
    },
    ...artPieces.map((artPiece) => {
      const { id, name, release_date } = artPiece;
      return {
        value: id,
        label: `${name} (${release_date})`,
      };
    }),
    ...newArtPieceOptions.map((artPiece) => {
      const { id, name, release_date } = artPiece;
      return {
        value: id,
        label: `${name} (${release_date})`,
      };
    }),
    
  ];
  

  const categoryOptions = [
    { value: 'Audio', label: 'Audio' },
    { value: 'Video', label: 'Video' },
    { value: 'Text', label: 'Text' },
    { value: 'Picture', label: 'Picture' },
    { value: 'Games', label: 'Games' },
  ];
  

  const handleImageUpload = (imageUrl) => {
    setReviewData({ ...reviewData, image_url: imageUrl });
  };

  const handleImageDelete = () => {
    setReviewData({ ...reviewData, image_url: '' });
  };

  const handleArtPieceChange = (selectedOption) => {
    if (selectedOption.value === "create_new") {
      setSelectedArtPiece(null);
      setReviewData({
        ...reviewData,
        art_piece: null,
        release_date: null,
        category: "",
      });
    } else {
      const artPiece = artPieces.find((ap) => ap.id === selectedOption.value);
      setSelectedArtPiece(artPiece);
      setReviewData({
        ...reviewData,
        art_piece: artPiece.name,
        release_date: artPiece.release_date,
        category: getCategoryNameById(artPiece.category_id),
      });
    }
  };
  
   

  const handleNewArtPieceChange = (event) => {
    setNewArtPieceName(event.target.value); 
  };

  const handleNewArtPieceSubmit = async (event) => {
    event.preventDefault();
  
    const newArtPiece = {
      id: `new-${Date.now()}`,
      name: newArtPieceName,
      release_date: newArtPieceReleaseDate,
      category: reviewData.category,
    };
  
    setNewArtPieceOptions([...newArtPieceOptions, newArtPiece]);
  
    setSelectedArtPiece(newArtPiece);
  
    setReviewData({
      ...reviewData,
      art_piece: newArtPiece.name,
      release_date: newArtPiece.release_date,
    });
  
    setNewArtPieceName('');
    setNewArtPieceReleaseDate('');
  };
  
  

  const handleTagsChange = (selectedTags) => {
    const tagsArray = selectedTags.slice(0, 10).map((tag) => tag.label); 
    setReviewData({ ...reviewData, tags: tagsArray });
    console.log(id,
      review_name,
      review_text,
      image_url,
      grade,
      tags,
      category,
      art_piece);
      console.log(initialReviewData);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const sanitizedValue = DOMPurify.sanitize(value);
    const limitedValue = name === "review_name" ? sanitizedValue.substring(0, 100) : sanitizedValue;
    setReviewData({ ...reviewData, [name]: limitedValue });
  };

  const handleStarRatingChange = (newRating) => {
    const clampedRating = Math.max(1, Math.min(newRating, 10));
    setReviewData({ ...reviewData, grade: clampedRating });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!reviewData.grade || !reviewData.image_url || !reviewData.review_name || !reviewData.review_text || !reviewData.art_piece || !reviewData.release_date) {
      toast.error('Please fill all the required fields: star grade, image, review title, review text, art piece name, and release date.');
      return;
    }
    console.log(reviewData);

    setIsLoading(true);

    try {
      if (editMode) {
        await dispatch(updateReview(id, { ...reviewData }));
        toast.success('Review updated successfully!');
      } else {
        await dispatch(createReview({ ...reviewData }));
        toast.success('Review submitted successfully!');
      }
    } catch (error) {
      toast.error(editMode ? 'Failed to update the review. Please try again.' : 'Failed to submit the review. Please try again.');
    } finally {
      setIsLoading(false);
      dispatch(setEditMode(false));
    }
    setReviewData({
      review_name: '',
      review_text: '',
      image_url: '',
      grade: 0,
      tags: [],
      art_piece: null,
      release_date: null,
    });
  };
  

  return (
    <div className="create-review">
      <ToastContainer />
      <div className="form-group">
        <label htmlFor="art_piece_id">{t('artPiecePrompt')}</label>
        <Select
          name="art_piece_id"
          value={selectedArtPiece ? { value: selectedArtPiece.id, label: `${selectedArtPiece.name} (${selectedArtPiece.release_date})` } : null}
          onChange={handleArtPieceChange}
          options={options}
          className="form-control"
          required
        />
      </div>
      {selectedArtPiece ? (
        <div>
          <h3>
            {t('selectedArtPiece')} {selectedArtPiece.name}
          </h3>
          {selectedArtPiece.image_url && <img src={selectedArtPiece.image_url} alt={selectedArtPiece.name} />}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="review_name">{t('reviewTitlePrompt')}</label>
              <input
                type="text"
                name="review_name"
                value={reviewData.review_name}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="review_text">{t('reviewPrompt')}</label>
            <MarkdownEditor
              value={reviewData.review_text}
              onChange={handleEditorChange}
              renderHTML={(text) => marked(text)}
            />
            </div>
            <div className="form-group">
              <label htmlFor="tags">{t('tagsPrompt')}</label>
              <Creatable
                isMulti
                name="tags"
                value={reviewData.tags.map(tagName => {
                  const tag = fetchedTags.find(t => t.name === tagName);
                  return { value: tag?.id || tagName, label: tagName };
                })}
                onChange={handleTagsChange}
                options={existingTags}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <CloudinaryUploadWidget onImageUpload={handleImageUpload} />
              {reviewData.image_url && (
                <div className="uploaded-image">
                  <img src={reviewData.image_url} alt="Uploaded" />
                  <button className="delete-image-btn" onClick={handleImageDelete}>
                    &times;
                  </button>
                </div>
              )}
            </div>
            <div className="form-group">
              <StarRating rating={reviewData.grade} onRatingChange={handleStarRatingChange} />
              {reviewData.grade}
            </div>
            <button type="submit" className="btn btn-primary">
              {t('reviewSubmit')}
            </button>
          </form>
          {isLoading && (
            <div className="mt-3">
              <Spinner animation="border" role="status">
                <span className="sr-only">...</span>
              </Spinner>
            </div>
          )}
        </div>
      ) : (
        <div>
          <form onSubmit={handleNewArtPieceSubmit}>
            <div className="form-group">
              <label htmlFor="new_art_piece_name">{t('newArtPiece')}</label>
              <input
                type="text"
                name="new_art_piece_name"
                value={newArtPieceName}
                onChange={handleNewArtPieceChange}
                className="form-control"
                required
              />
        </div>
        <div className="form-group">
          <label htmlFor="new_art_piece_release_date">{t('artPieceReleaseData')}</label>
          <input
            type="number"
            name="new_art_piece_release_date"
            value={newArtPieceReleaseDate}
            onChange={handleNewArtPieceReleaseDateChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">{t('artPieceCategory')}</label>
          <Select
            name="category"
            value={reviewData.category ? { value: reviewData.category, label: reviewData.category } : null}
            onChange={handleCategoryChange}
            options={categoryOptions}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
              {t('artPieceCreate')}
        </button>
      </form>
    </div>
      )}
    </div>
  );
  
};

export default CreateReview;


