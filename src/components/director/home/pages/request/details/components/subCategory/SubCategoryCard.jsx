// Essentials
import React, { useState } from 'react';
import { Accordion, Button, Card, Col, Row, Stack, Form } from 'react-bootstrap';
import { getUnit } from 'utils/helpers/Food';

// Components
import FoodCard from './FoodCard';

// Utility
import { useResizer } from 'utils/helpers/Resizer.jsx';

const sampleData = {
  name: 'Thực phẩm con',
  stock: 100,
  unit: 'kg'
};


const SubCategoryCard = ({
  subCategory,
  setSubCategory,
  onSubShow
}) => {
  let size = useResizer();

  return (
    <>
      <Row>
        <Col className='px-0'>
          <Card className='long-product-item-static'>
            <Row xs={1} lg={2}>
              <Col className='ps-0' xs={12} lg={4}>
                <Stack direction='horizontal'>
                  <img
                    className='long-product-image'
                    src={`https://bachkhoi.online/static/${'category_13_image'}`} alt='product-img'
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

              <Col lg={8} className={`${size > 0 && 'd-flex justify-content-between align-items-center'} ${size < 3 && 'ps-0 py-3'}`}>
                <div className={`d-flex ${size < 3 && 'ps-0'} ${size < 2 && 'mt-2'}`} xs={12} md={6}>
                  <div>
                    <header className='long-product-label'>{`${subCategory.unit === 'kg' ? 'Khối' : 'Số'} lượng (${getUnit(subCategory.unit)})`}</header>
                    <div className='mt-2'>
                      <Form.Group>
                        <Form.Control
                          type='number'
                          value={subCategory.count}
                          readOnly
                        />
                      </Form.Group>
                    </div>
                  </div>
                </div>

                <div className={`d-flex ${size < 3 && 'ps-0'} ${size < 2 && 'mt-2'}`}>
                  <Button className='fogi' variant='primary'>
                    Chọn Thực phẩm
                  </Button>
                </div>
              </Col>
            </Row>
            <Accordion className='mt-3'>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Danh sách Thực phẩm (0)</Accordion.Header>
                <Accordion.Body>
                  {Array.from({ length: 2 }).map((_,idx) => (
                    <div className={idx !== 0 && 'mt-3'} key={idx}>
                      <FoodCard
                        food={sampleData}
                      />
                    </div>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Card>
        </Col>
      </Row>
    </>
  )
};

export default SubCategoryCard;
