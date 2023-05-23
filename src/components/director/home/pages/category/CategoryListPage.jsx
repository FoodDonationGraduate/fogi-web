// Essentials
import React, { useState } from 'react';

// Components
import ListTitle from './components/ListTitle';
import CategoryList from './components/CategoryList';
import CategoryModal from './components/CategoryModal';

const ApproveListPage = () => {
  // Category Modal
  const [show, setShow] = useState(false);
  const onClose = () => setShow(false);
  const onShow = () => setShow(true);

  // For editing Category
  const [targetCategory, setTargetCategory] = useState(null);

  return (
    <>
      <div>
        <ListTitle
          onShow={onShow}
          setTargetCategory={setTargetCategory}
        />
        <CategoryList
          setTargetCategory={setTargetCategory}
          onShow={onShow}
        />
      </div>
      <CategoryModal
        targetCategory={targetCategory}
        show={show}
        onShow={onShow}
        onClose={onClose}
      />
    </>
  );
};

export default ApproveListPage;
