// Essentials
import React from 'react';

// Components
import ListTitle from './ListTitle';
import CategoryList from './CategoryList';

const CategoryListPage = ({
  setTargetCategory,
  onShow
}) => {

  return (
    <>
      <div>
        <ListTitle
          setTargetCategory={setTargetCategory}
          onShow={onShow}
        />
        <CategoryList setTargetCategory={setTargetCategory} />
      </div>
    </>
  );
};

export default CategoryListPage;
