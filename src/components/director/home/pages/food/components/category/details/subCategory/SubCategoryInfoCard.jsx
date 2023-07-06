// Essentials
import React, { useState } from 'react';
import { Button, Stack } from 'react-bootstrap';

// Style
import 'assets/css/director/HomePage.css';

const CategoryInfoCard = ({
  subCategory,
  setTargetSubCategory,
  onSubShow
}) => {

  const showSubCategoryModal = () => {
    setTargetSubCategory(subCategory);
    onSubShow();
  };

  return (
    <>
      <div className='manage-card'>
        <Stack direction='horizontal' gap={4}>
          <img className='manage-details-profile-logo' src={`https://bachkhoi.online/static/${'category_13_image'}`} alt='director logo'/>
          <Stack className='justify-content-center' direction='vertical' gap={2}>
            <h3 className='manage-card-name fw-bold'>
              {subCategory.name}
            </h3>
            <Stack direction='horizontal' gap={2}>
              <Button variant='outline-secondary' onClick={showSubCategoryModal}>
                Chỉnh sửa
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </div>
    </>
  );
};

export default CategoryInfoCard;
