import React from 'react';
import { GalleryItem, ImageItem } from './ImageGalleryItem.styled';

export default function ImageGalleryItem({ images, onClick }) {
  return (
    <>
      {images.map(item => {
        return (
          <GalleryItem key={item.id}>
            <ImageItem
              src={item.webformatURL}
              onClick={() => onClick(item.largeImageURL)}
              alt=""
            />
          </GalleryItem>
        );
      })}
    </>
  );
}
