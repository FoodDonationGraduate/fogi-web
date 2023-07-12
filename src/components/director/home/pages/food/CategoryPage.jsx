// Essentials
import React, { useState } from 'react';

// Components
import CategoryModal from './components/category/CategoryModal';
import ListTitle from './components/category/ListTitle';
import CategoryList from './components/category/CategoryList';

const CategoryListPage = () => {

  // Category Modal
  const [show, setShow] = useState(false);
  const onShow = () => setShow(true);
  const onClose = () => setShow(false);

  return (
    <>
      <div>
        <ListTitle onShow={onShow} />
        <CategoryList />
      </div>
      <CategoryModal
        show={show}
        onShow={onShow}
        onClose={onClose}
      />
    </>
  );
};

export default CategoryListPage;
