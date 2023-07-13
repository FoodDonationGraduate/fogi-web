// Essentials
import React, { useState } from 'react';
import { Button, Col, Row, Stack } from 'react-bootstrap';
import { getUnit } from 'utils/helpers/Food';

// Style
import 'assets/css/director/HomePage.css';

const SubCategoryInfoCard = ({
  subCategory
}) => {

  return (
    <>
      <div className='manage-card'>
        <Row>
          <Col className='px-0' md={9} xl={10}>
            <Stack direction='horizontal' gap={4}>
              <img
                className='manage-details-profile-logo-alt' alt='director logo'
                src={`https://bachkhoi.online/static/${subCategory.image_filename}`}
              />
              <Stack className='justify-content-center' direction='vertical'>
                <h4 className='manage-card-name fw-bold'>
                  {subCategory.name}
                </h4>
                <div className='mb-2'>
                  <div>Tồn kho: {subCategory.stock} {getUnit(subCategory.unit)}</div>
                </div>
                <div>
                  <small style={{ color: '#999' }}>{subCategory.description}</small>
                </div>
              </Stack>
            </Stack>
          </Col>
          <Col className='d-grid align-items-center px-0'>
            <Button variant='outline-secondary'>
              Chỉnh sửa
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default SubCategoryInfoCard;
