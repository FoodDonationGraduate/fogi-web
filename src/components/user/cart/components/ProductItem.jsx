// Essentials
import React, { useState, useEffect } from 'react';
import { Button, Card, Form, Col, Row, Stack } from 'react-bootstrap';

// Assets
import ProductImage from 'assets/images/ProductImage.jpg'; // temporary

// Utility
import { useResizer } from 'utils/helpers/Resizer.jsx';

const ProductItem = ({
  product
}) => {
  let size = useResizer();
  const [count, setCount] = useState(0);
  const increaseCount = () => { setCount(count + 1) };
  const decreaseCount = () => {
    if (count > 0) setCount(count - 1)
  };

  useEffect(() => {
    setCount(0);
  }, [product]);

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
                  <h5 className='fw-bold mb-3'>
                    {product.title}
                  </h5>
                  {size > 0 &&
                    <span className='long-product-type'>
                      Product type
                    </span>
                  }
                </div>
              </Stack>
            </Col>

            <Col lg={8} className={size < 3 && 'ps-0 py-3'}>
              <Row xs={2} md={4}>
                <Col className={`d-flex ${size < 3 && 'ps-0'}`}>
                  <Stack className='my-auto' direction='vertical' gap={2}>
                    <header className='long-product-label'>
                      {size > 0 ? 'Remaining t' : 'T'}ime
                    </header>
                    <h5>2 days left</h5>
                  </Stack>
                </Col>

                <Col className={`d-flex ${size < 3 && 'ps-0'}`}>
                  <Stack className='my-auto' direction='vertical' gap={2}>
                    <header className='long-product-label'>Price</header>
                    <h5>10.000 VNĐ</h5>
                  </Stack>
                </Col>

                <Col className={`d-flex ${size < 3 && 'ps-0'}`}>
                  <Stack className='my-auto' direction='vertical' gap={2}>
                    <header className='long-product-label'>Portions</header>
                    <Stack direction='horizontal'>
                      {size > 0 &&
                        <Button
                          variant='outline-secondary'
                          onClick={decreaseCount}
                        >
                          +
                        </Button>
                      }
                      <Form.Group style={{width: `${size < 3 ? '50%' : '80%'}`}}>
                        <Form.Control
                          type='number'
                          value={count}
                          style={{ textAlign: 'center' }}
                          onChange={(e) => setCount(Number(e.target.value))}
                        />
                      </Form.Group>
                      {size > 0 &&
                        <Button
                          variant='outline-secondary'
                          onClick={increaseCount}
                        >
                          +
                        </Button>
                      }
                    </Stack>
                  </Stack>
                </Col>

                <Col className={`d-flex ${size < 3 && 'ps-0'}`}>
                  <Stack className='my-auto' direction='vertical' gap={2}>
                    <header className='long-product-label'>Total</header>
                    <h5>20.000 VNĐ</h5>
                  </Stack>
                </Col>
              </Row>
            </Col>
          </Row>

          <hr />

          <Row>
            <Col className='ps-0'>
              <Stack direction='horizontal' gap={3}>
                <header className='fw-bold'>Options</header>
                <Button variant='outline-danger'>
                  Remove
                </Button>
              </Stack>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default ProductItem;
