// Essentials
import React, { useState } from 'react';
import { Button, Stack } from 'react-bootstrap';

// Style
import 'assets/css/director/HomePage.css';

const CategoryInfoCard = ({
  category,
  setTargetCategory,
  setTargetSubCategory,
  onShow,
  onSubShow
}) => {
  const showCategoryModal = () => {
    setTargetCategory(category);
    onShow();
  };

  const showSubCategoryModal = () => {
    setTargetSubCategory(null);
    onSubShow();
  };

  return (
    <>
      <div className='manage-card'>
        <Stack direction='horizontal' gap={4}>
          <img className='manage-details-profile-logo' src={`https://bachkhoi.online/static/${category.image}`} alt='director logo'/>
          <Stack className='justify-content-center' direction='vertical' gap={2}>
            <h3 className='manage-card-name fw-bold'>
              {category.name}
            </h3>
            <Stack direction='horizontal' gap={2}>
              <Button variant='outline-secondary' onClick={showCategoryModal}>
                Chỉnh sửa
              </Button>
              <Button
                className='fogi'
                variant='primary'
                onClick={showSubCategoryModal}
              >
                Thêm Thực phẩm lớn
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </div>
    </>
  );
};

export default CategoryInfoCard;
