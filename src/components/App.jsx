import React, { useState, useEffect, useRef } from 'react';
import Loader from 'components/Loader/Loader';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import fetchPhotos from '../components/services/searchPhoto-api';
import { GeneralWrap } from './App.styled';

export default function App() {
  const [inputValue, setInputValue] = useState(''); // значение ввода инпута
  const [loading, setLoading] = useState(false); // статус отображения загружчика
  const [images, setImages] = useState([]); // данные из Api
  const [showModal, setShowModal] = useState(false); // статус отображения модалки
  const [largeImageURL, setLargeImageURL] = useState(0); // id выбранного фото
  const [totalPhotos, setTotalPhotos] = useState(0); // всего фото в коллекции
  const [page, setPage] = useState(1); // страница загрузки с Api

  const prevInputValueRef = useRef();
  const prevPageRef = useRef();
  const prevImagesRef = useRef();

  useEffect(() => {
    if (inputValue === '') {
      return;
    } else if (
      inputValue !== prevInputValueRef.current ||
      page !== prevPageRef.current
    ) {
      setLoading(true);
      fetchPhotos(inputValue, page)
        .then(data => {
          setTotalPhotos(data.total);
          if (data.total < 1) {
            toast.info('УПС! 🫤 Відсутні фото за Вашим пошуком 🤷🏻');
          } else {
            setImages([...prevImagesRef.current, ...data.hits]);
            setTotalPhotos(data.total);
            setLoading(false);
          }
        })
        .catch(error => {
          console.log(error);
          console.error('There was a problem with the fetch operation:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    prevInputValueRef.current = inputValue;
    prevPageRef.current = page;
    prevImagesRef.current = images;
  }, [images, inputValue, page]);

  const handleSubmit = searchValue => {
    setInputValue(searchValue);
    setLoading(true);
    setImages([]);
    setPage(1);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const currentPhoto = largeImageURL => {
    setLargeImageURL(largeImageURL);
    toggleModal();
  };

  const renderMore = async () => {
    setPage(prevPageRef.current + 1);
    setLoading(true);
  };

  return (
    <GeneralWrap>
      <Searchbar onSubmit={handleSubmit} />
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {loading && <Loader />}

      <ImageGallery images={images} onClick={currentPhoto} />

      {images.length < totalPhotos && (
        <Button onClick={renderMore}>Load more</Button>
      )}

      {showModal && (
        <Modal onClose={toggleModal} largeImageURL={largeImageURL}></Modal>
      )}
    </GeneralWrap>
  );
}
