import { Item } from 'components/ImageGallery/ImageGallery.styled';
import { Modal } from 'components/Modal/Modal';
import { useState } from 'react';

export const ImageGalleryItem = ({
  data: { id, webformatURL, largeImageURL },
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Item onClick={openModal} key={id}>
      <img src={webformatURL} alt={id} />
      <Modal isOpen={isModalOpen} onClose={closeModal} imgUrl={largeImageURL} />
    </Item>
  );
};
