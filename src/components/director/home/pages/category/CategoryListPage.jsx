// Essentials
import React, { useState } from 'react';

// Components
import ListTitle from './components/ListTitle';
import CategoryList from './components/CategoryList';
import AddCategoryModal from './components/CategoryModal';

const ApproveListPage = () => {
  // Add Category Modal
  const [show, setShow] = useState(false);
  const onClose = () => setShow(false);
  const onShow = () => setShow(true);

  return (
    <>
      <div>
        <ListTitle onShow={onShow} />
        <CategoryList />
      </div>
      <AddCategoryModal show={show} onShow={onShow} onClose={onClose} />
    </>
  );
};

export default ApproveListPage;
