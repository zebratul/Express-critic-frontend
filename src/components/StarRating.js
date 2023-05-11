import React from 'react';
import './StarRating.css';

const StarRating = ({ rating, onRatingChange }) => {
  const handleChange = (event) => {
    onRatingChange(event.target.value / 2);
  };

  return (
    <fieldset className="rate">
      {Array.from({ length: 20 }, (_, index) => index + 1).reverse().map((value) => (
        <React.Fragment key={value}>
          <input
            type="radio"
            id={`rating${value}`}
            name="rating"
            value={value}
            checked={rating * 2 === value}
            onChange={handleChange}
          />
          <label
            htmlFor={`rating${value}`}
            title={`${(value / 2).toFixed(1)} stars`}
            className={value % 2 !== 0 ? 'half' : ''}
          />
        </React.Fragment>
      ))}
    </fieldset>
  );
};

export default StarRating;
