import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTags, setDisplayTags } from '../../actions/artPieceActions';
import { searchReviews } from '../../actions/searchActions';

const TagReviews = ({ activeTabKey }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.reviews.isLoading);
  const tags = useSelector((state) => state.artpieces.tags);

  useEffect(() => {
    if (activeTabKey === 'tags') {
      dispatch(fetchTags());
    }
  }, [dispatch, activeTabKey]);

  const performSearch = async (query) => {
    dispatch(searchReviews(query));
  };

  const handleTagClick = (tagName) => {
    dispatch(setDisplayTags(false));
    performSearch(tagName);
  };

  const maxUsageCount = Math.max(...tags.map((tag) => tag.usageCount));

  const getFontSizeBasedOnUsage = (usageCount) => {
    const minFontSize = 12;
    const maxFontSize = 48;
    const scaleFactor = (maxFontSize - minFontSize) / maxUsageCount;
    return minFontSize + scaleFactor * usageCount;
  };

  if (activeTabKey !== 'tags') {
    return null;
  }

  return (
    <div className="tags-container">
      {tags.map((tag) => (
        <button
          key={tag.id}
          className="tag"
          onClick={() => handleTagClick(tag.name)}
          style={{
            background: "none",
            border: "none",
            textDecoration: "underline",
            cursor: "pointer",
            fontSize: `${getFontSizeBasedOnUsage(tag.usageCount)}px`,
          }}
        >
          {tag.name}
        </button>
      ))}
    </div>
  );
};

export default TagReviews;
