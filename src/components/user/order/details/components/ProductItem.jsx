// Essentials
import React from 'react';
import { Card, Form, Col, Row, Stack } from 'react-bootstrap';

// Utility
import { useResizer } from 'utils/helpers/Resizer.jsx';
import { distanceTime } from 'utils/helpers/Time';
import { getUnit } from 'utils/helpers/Food';

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
                  src={`https://bachkhoi.online/static/${product.image_filename}`}
                  width='96' height='96'
                />
                <div className='ms-4'>
                  <h5 className='fw-bold'>
                    {product.name}
                  </h5>
                  <span className={size > 0 ? 'long-product-type' : 'long-product-type-sm'}>
                    {product.category_name}
                  </span>
                </div>
              </Stack>
            </Col>

            <Col lg={8} className={size < 3 && 'ps-0 py-3'}>
              <Row xs={2} md={4}>
                <Col className={`d-flex ${size < 3 && 'ps-0'}`}>
                  <Stack className='my-auto' direction='vertical' gap={2}>
                    <header className='long-product-label'>
                      {size > 0 ? 'Còn' : 'HSD'}
                    </header>
                    <h5>{distanceTime(product.expired_time)}</h5>
                  </Stack>
                </Col>

                <Col className={`d-flex ${size < 3 && 'ps-0'}`}>
                  <Stack className='my-auto' direction='vertical' gap={2}>
                    <header className='long-product-label'>{`Số lượng (${getUnit(product.unit)})`}</header>
                    <Stack direction='horizontal'>
                      <Form.Group style={{width: '50%'}}>
                        <Form.Control
                          type='number'
                          value={product.quantity}
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
