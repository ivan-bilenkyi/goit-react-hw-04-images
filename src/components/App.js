import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { GlobalStyle } from './GlobalStyle';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchPhotos } from './api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMore } from './Button/LoadMore';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [images, setImages] = useState([]);
  const [value, setValue] = useState('');
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!value) {
      return;
    }
    const valueItem = value.split('/');
    const word = valueItem[valueItem.length - 1];
    const fetchPhoto = async () => {
      try {
        setLoading(true);
        setError(false);
        setLoadMore(false);
        const initialPhotos = await fetchPhotos(word, page);
        const { totalHits, hits } = initialPhotos;
        const totalPage = Math.ceil(totalHits / 12);
        setImages(prevImages => [...prevImages, ...hits]);

        if (totalPage > page) {
          setLoadMore(true);
        }
      } catch (error) {
        toast.error('Please Try Again');
      } finally {
        setLoading(false);
      }
    };

    fetchPhoto();
  }, [page, value, error]);

  const handleSubmit = ({ value }) => {
    setImages([]);
    setValue(`${Date.now()}/${value}`);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevState => (prevState += 1));
  };
  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      {images.length > 0 && <ImageGallery initialGallery={images} />}
      {loadMore && <LoadMore onClick={handleLoadMore} />}

      <GlobalStyle />
      <Toaster position="top-right" reverseOrder={false} />
      {loading && <Loader />}
    </>
  );
};
