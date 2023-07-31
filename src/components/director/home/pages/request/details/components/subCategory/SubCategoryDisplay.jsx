// Essentials
import React from 'react';
import { Card, Col, Row, Stack } from 'react-bootstrap';
import { getUnit } from 'utils/helpers/Food';

// Utility
import { useResizer } from 'utils/helpers/Resizer.jsx';

const SubCategoryCard = ({
  subCategory
}) => {
  let size = useResizer();

  return (
    <>
      <Row>
        <Col className='px-0'>
          <Card className='long-product-item-static'>
            <Row xs={1} lg={2}>
              <Col className='ps-0' xs={12} lg={6}>
                <Stack direction='horizontal'>
                  <img
                    className='long-product-image'
                    src={`https://bachkhoi.online/static/${subCategory.image_filename}`} alt='product-img'
                    width='96' height='96'
                  />
                  <div className='ms-4'>
                    <h5 className='fw-bold'>
                      {subCategory.name}
                    </h5>
                    <span className={size > 0 ? 'long-product-type' : 'long-product-type-sm'}>
                      {subCategory.category_name}
                    </span>
                  </div>
                </Stack>
              </Col>

              <Col lg={6} className={`${size > 0 ? 'd-flex justify-content-between align-items-center' : ''} ${size < 3 ? 'ps-0 py-3' : ''}`}>
                <div className={`d-flex ${size < 3 ? 'ps-0' : ''} ${size < 2 ? 'mt-2' : ''}`} xs={12} md={6}>
                  <div>
                    <header className='long-product-label'>{`${subCategory.unit === 'kg' ? 'Khối' : 'Số'} lượng (${getUnit(subCategory.unit)})`}</header>
                    <h5
                      className='mt-2'
                    >
                      {subCategory.quantity}
                    </h5>
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  )
};

export default SubCategoryCard;
