import React, { useEffect, useRef, useCallback } from 'react';

const CloudinaryUploadWidget = ({ onImageUpload }) => {
  const uploadWidgetButton = useRef(null);

  const handleUploadWidgetClick = useCallback(() => {
    const cloudName = 'dnpyr5ilc';
    const uploadPreset = 'yjozwgbv';

    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,

      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          console.log('Done! Here is the image info: ', result.info);
          onImageUpload(result.info.url);
        }
      },
    );

    myWidget.open();
  }, [onImageUpload]);

  useEffect(() => {
    if (uploadWidgetButton.current) {
      uploadWidgetButton.current.addEventListener('click', handleUploadWidgetClick, false);
    }

    return () => {
      if (uploadWidgetButton.current) {
        uploadWidgetButton.current.removeEventListener('click', handleUploadWidgetClick, false);
      }
    };
  }, [handleUploadWidgetClick]);

  return (
    <button ref={uploadWidgetButton} className="cloudinary-button" type="button">
      Upload an image to go with your review.
    </button>
  );
  
};

export default CloudinaryUploadWidget;
