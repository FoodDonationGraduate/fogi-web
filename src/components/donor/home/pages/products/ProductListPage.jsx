// Essentials
import * as React from 'react';
import { useState } from 'react';

// Components
import ListTitle from './components/ListTitle';
import PostProductModal from './components/PostProductModal';
import ProductList from './components/ProductList';

const ProductListPage = () => {
  // Post Product Modal
  const [show, setShow] = useState(false);
  const onClose = () => setShow(false);
  const onShow = () => setShow(true);

  return (
    <>
      <PostProductModal show={show} onClose={onClose} />

      <div>
        <ListTitle onShow={onShow} />
        <ProductList />
      </div>
    </>
  );
};

export default ProductListPage;
