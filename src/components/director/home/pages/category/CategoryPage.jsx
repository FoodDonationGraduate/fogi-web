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

  // Category Modal
  const [show, setShow] = useState(false);
  const onShow = () => setShow(true);
  const onClose = () => setShow(false);

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
            />
          }
        </Container>
        <CategoryModal
          show={show}
          onShow={onShow}
          onClose={onClose}
        />
      </div>
    </>
  );
};

export default CategoryPage;
