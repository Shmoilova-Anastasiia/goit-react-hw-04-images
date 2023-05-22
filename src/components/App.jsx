import React, {useState, useEffect} from "react";


import { Searchbar } from './Searchbar/Searchbar';
import { getImages } from './service/image-servise';
import { ImageGalleryList } from './ImageGallery/ImageGallery';
import { Button } from './Button/ButtonLoadMore';
import { Loader } from "./Loader/Loader";
import { Modal } from "./Modal/Modal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!query) return;
    const getData = (query, page) => {
    setIsLoading(true);
    getImages(query, page)
      .then(({ hits, totalHits }) => {
        const totalPages = Math.ceil(totalHits / 12);
        const data = hits.map(({ id, webformatURL, largeImageURL, tags }) => {
          return {
            id,
            webformatURL,
            largeImageURL,
            tags,
          };
        });

        if (hits.length === 0) {
          return toast.error('Sorry, no images found. Please, try again!');
        }

        if (page === 1) {
          toast.success(`Hooray! We found ${totalHits} images.`);
        }
        
        setImages(images =>[...images, ...data])     
        setIsLoading(page < totalPages);
        setTotal(totalHits);  
      })
        
      .catch(error => setError(error))
      .finally(() => setIsLoading (false));
  }
      getData(query, page);
  }, [query, page]);

  
  const handleSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
    setError(null);
    setLargeImageURL(null);
  };

  const onloadMore = () => {
    setPage(page => page + 1);
  };

  const toggleModal = largeImageURL => {
    setShowModal (!showModal);
    setLargeImageURL(largeImageURL);
  };

  const isLastPage = images.length === total;
  const loadImages = images.length !== 0;
  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
        {error && toast.error(error.message)}

        {isLoading && <Loader />}
        
        {loadImages && (<ImageGalleryList images={images} onClick={toggleModal} />)}
       
        {loadImages && !isLoading && !isLastPage && (<Button onClick={onloadMore}>Load More</Button>)}
        
        {showModal && (<Modal onClose={toggleModal}> <img src={largeImageURL} alt={images.tags} /></Modal>)}
        
      <ToastContainer theme="colored" position="top-right" autoClose={3000} />
    </>
  )
}

  

  
    