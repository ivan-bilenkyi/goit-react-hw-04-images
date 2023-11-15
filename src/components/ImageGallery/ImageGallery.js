import { Layout } from 'components/Layout';
import { List } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ initialGallery }) => {
  // console.dir(initialGallery);
  return (
    <section>
      <Layout>
        <List>
          {initialGallery.map((item, index) => (
            <ImageGalleryItem data={item} key={index} />
          ))}
        </List>
      </Layout>
    </section>
  );
};
