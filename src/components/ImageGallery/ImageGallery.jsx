import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import React from 'react';
import { GalleryList } from './ImageGallery.styled';

export default function ImageGallery({ images, onClick }) {
  return (
    <>
      <GalleryList>
        <ImageGalleryItem images={images} onClick={onClick} />
      </GalleryList>
    </>
  );
}
