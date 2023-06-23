// Essentials
import * as React from 'react';
import { useState } from 'react';

// Components
import ListTitle from './components/ListTitle';
import LocationCard from './components/LocationCard';
import PostProductModal from './components/PostProductModal';
import ProductList from './components/ProductList';

const ProductListPage = () => {
  // Post Product Modal
  const [show, setShow] = useState(false);
  const onClose = () => setShow(false);
  const onShow = () => setShow(true);

  return (
    <>
      <div>
        <ListTitle onShowAdd={onShow} />
        <LocationCard />
        <ProductList />
      </div>
      <PostProductModal show={show} onClose={onClose} />
    </>
  );
};

export default ProductListPage;
