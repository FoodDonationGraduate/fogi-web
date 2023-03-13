// Essentials
import * as React from 'react';
import { Card, Col, Row, Stack } from 'react-bootstrap';

// Assets
import { MdDeleteOutline } from 'react-icons/md';
import ProductImage from 'assets/images/ProductImage.jpg'; // temporary

const ProductItem = ({
  product
}) => {

  return (
    <Row>
      <Col className='px-0'>
        <Card className='donor-product-item'>
          <Row>
            <Col className='ps-0' md={6} lg={7}>
              <Stack direction='horizontal'>
                <img
                  className='donor-product-image'
                  src={ProductImage}
                  width='96' height='96'
                />
                <h5 className='fw-bold ms-4'>
                  {product.title}
                </h5>
              </Stack>
            </Col>

            <Col className='my-auto' md={6} lg={5}>
              <Row>
                <Col md={5} lg={5}>
                  <header className='donor-product-label'>Price</header>
                </Col>
                <Col>
                  <h5>{product.price} VNĐ</h5>
                </Col>
              </Row>
              <Row>
                <Col md={5} lg={5}>
                  <header className='donor-product-label'>In store</header>
                </Col>
                <Col>
                  <h5>7 portions</h5>
                </Col>
              </Row>
              <Row>
                <Col md={5} lg={5}>
                  <header className='donor-product-label'>Time left</header>
                </Col>
                <Col>
                  <h5>2 days</h5>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </Col>
      
      <Col className='px-0' lg={1}>
        <Card className='donor-product-tail align-items-center'>
          <MdDeleteOutline className='donor-product-icon my-auto' />
        </Card>
      </Col>
    </Row>
  );
};

export default ProductItem;
