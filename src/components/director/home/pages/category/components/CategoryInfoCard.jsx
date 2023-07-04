// Essentials
import React, { useState } from 'react';
import { Button, Stack } from 'react-bootstrap';

// Components
import CategoryModal from './CategoryModal';

// Style
import 'assets/css/director/HomePage.css';

const CategoryInfoCard = ({
  category
}) => {

  // Category Modal
  const [show, setShow] = useState(false);
  const onShow = () => setShow(true);
  const onClose = () => setShow(false);

  return (
    <>
      <CategoryModal
        targetCategory={category}
        show={show}
        onShow={onShow}
        onClose={onClose}
      />
      <div className='manage-card'>
        <Stack direction='horizontal' gap={4}>
          <img className='manage-details-profile-logo' src={`https://bachkhoi.online/static/${category.image}`} alt='director logo'/>
          <Stack className='justify-content-center' direction='vertical' gap={2}>
            <h3 className='manage-card-name fw-bold'>
              {category.name}
            </h3>
            <div>
              <Button variant='outline-secondary' onClick={onShow}>
                Chỉnh sửa
              </Button>
            </div>
          </Stack>
        </Stack>
      </div>
    </>
  );
};

export default CategoryInfoCard;
