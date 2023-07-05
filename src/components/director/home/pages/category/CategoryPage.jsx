// Essentials
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';

// Components
import CategoryModal from './components/CategoryModal';
import CategoryListPage from './components/CategoryListPage';
import CategoryDetails from './components/CategoryDetails';

const CategoryPage = () => {

  // Details
  const [targetCategory, setTargetCategory] = useState(null);
  const [targetSubCategory, setTargetSubCategory] = useState(null);

  // Category Modal
  const [show, setShow] = useState(false);
  const onShow = () => setShow(true);
  const onClose = () => setShow(false);

  // SubCategory Modal
  const [subShow, setSubShow] = useState(false);
  const onSubShow = () => setSubShow(true);
  const onSubClose = () => setSubShow(false);

  return (
    <>
      <div>
        <Container>
          {!targetCategory &&
            <CategoryListPage
              setTargetCategory={setTargetCategory}
              onShow={onShow}
            />
          }
          {targetCategory &&
            <CategoryDetails
              category={targetCategory}
              setTargetCategory={setTargetCategory}
              setTargetSubCategory={setTargetSubCategory}
              onShow={onShow}
              onSubShow={onSubShow}
            />
          }
        </Container>
      </div>
      <CategoryModal
        targetCategory={targetCategory}
        show={show}
        onShow={onShow}
        onClose={onClose}
      />
      <CategoryModal
        targetCategory={targetSubCategory}
        show={subShow}
        onShow={onSubShow}
        onClose={onSubClose}
        isSubCategory={true}
      />
    </>
  );
};

export default CategoryPage;
