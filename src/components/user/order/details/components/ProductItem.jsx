// Essentials
import React, { useState, useEffect } from 'react';
import { Button, Card, Form, Col, Row, Stack } from 'react-bootstrap';

// Assets
import ProductImage from 'assets/images/ProductImage.jpg'; // temporary

// Utility
import { useResizer } from 'utils/helpers/Resizer.jsx';
import { convertNumberToVnd } from 'utils/helpers/Money.jsx';

const ProductItem = ({
  product
}) => {
  let size = useResizer();

  return (
    <Row>
      <Col className='px-0'>
        <Card className='long-product-item-static'>
          <Row xs={1} lg={2}>
            <Col className='ps-0' xs={12} lg={4}>
              <Stack direction='horizontal'>
                <img
                  className='long-product-image'
                  src={ProductImage}
                  width='96' height='96'
                />
                <div className='ms-4'>
                  <h5 className='fw-bold'>
                    {product.title}
                  </h5>
                  <span className={size > 0 ? 'long-product-type' : 'long-product-type-sm'}>
                    Danh mục
                  </span>
                </div>
              </Stack>
            </Col>

            <Col lg={8} className={size < 3 && 'ps-0 py-3'}>
              <Row xs={2} md={4}>
                <Col className={`d-flex ${size < 3 && 'ps-0'}`}>
                  <Stack className='my-auto' direction='vertical' gap={2}>
                    <header className='long-product-label'>
                      {size > 0 ? 'Hạn sử dụng' : 'HSD'}
                    </header>
                    <h5>2 ngày</h5>
                  </Stack>
                </Col>

                <Col className={`d-flex ${size < 3 && 'ps-0'}`}>
                  <Stack className='my-auto' direction='vertical' gap={2}>
                    <header className='long-product-label'>{`Số lượng (Phần)`}</header>
                    <Stack direction='horizontal'>
                      <Form.Group style={{width: '50%'}}>
                        <Form.Control
                          type='number'
                          value='2'
                          style={{ textAlign: 'center' }}
                          readOnly
                        />
                      </Form.Group>
                    </Stack>
                  </Stack>
                </Col>
                
              </Row>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default ProductItem;
