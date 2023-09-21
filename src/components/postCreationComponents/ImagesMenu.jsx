import React from 'react';
import { Carousel } from '@material-tailwind/react';

export default function ImagesMenu({ setSelectedImage, images }) {
  const clickHandler = (imageId) => {
    setSelectedImage(imageId);
  };

  const handleKeyDown = (e, imageId) => {
    if (e.key === 'Enter') {
      setSelectedImage(imageId);
    }
  };

  return (
    <Carousel
      className="rounded-xl"
      style={{
        width: '60%',
        // height: '50%',
        margin: 'auto',
      }}
    >
      {images.map((image) => (
        <button
          type="button"
          key={image.id}
          className="h-full w-full p-0 border-none bg-transparent cursor-pointer"
          onClick={() => clickHandler(image.id)}
          onKeyDown={(e) => handleKeyDown(e, image.id)}
        >
          <img
            src={image.url}
            alt={image.id}
            style={{ objectFit: 'cover', maxHeight: '96%' }}
            className="h-full w-full object-cover"
          />
        </button>
      ))}
    </Carousel>
  );
}
