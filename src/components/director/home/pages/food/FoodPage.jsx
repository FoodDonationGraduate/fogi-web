// Essentials
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';

// Components
import CategoryModal from './components/category/CategoryModal';
import CategoryListPage from './components/category/list/CategoryListPage';
import CategoryDetailsPage from './components/category/details/CategoryDetailsPage';
import SubCategoryDetailsPage from './components/category/details/subCategory/SubCategoryDetailsPage';

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
          {targetCategory && !targetSubCategory &&
            <CategoryDetailsPage
              category={targetCategory}
              setTargetCategory={setTargetCategory}
              setTargetSubCategory={setTargetSubCategory}
              onShow={onShow}
              onSubShow={onSubShow}
            />
          }
          {targetSubCategory &&
            <SubCategoryDetailsPage
              subCategory={targetSubCategory}
              setTargetSubCategory={setTargetSubCategory}
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
