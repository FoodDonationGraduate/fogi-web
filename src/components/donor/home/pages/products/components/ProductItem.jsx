// Essentials
import * as React from 'react';
import { Card, Col, Row, Stack } from 'react-bootstrap';

// Assets
import { MdDeleteOutline, MdAccessTime, MdAllInbox, MdMonetizationOn } from 'react-icons/md';
import ProductImage from 'assets/images/ProductImage.jpg'; // temporary

// Utility
import { useResizer } from 'utils/helpers/Resizer.jsx';

const ProductItem = ({
  product
}) => {

  let size = useResizer();

  return (
    <Row>
      <Col className='px-0'>
        <Card className='long-product-item'>
          <Row>
            <Col className='ps-0' md={6} lg={7}>
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
                  <span className='long-product-type'>
                    Product type
                  </span>
                </div>
              </Stack>
            </Col>
            
            <Col className={`my-auto ${size <= 1 && 'ps-0 pt-4'}`} sm={12} md={6} lg={5}>
              <Row>
                <Col xs={1} sm={3} md={5} lg={5}>
                  {size === 0 && (
                    <MdMonetizationOn className='long-product-label-icon' />
                  )}
                  {size > 0 && (
                    <header className='long-product-label'>Price</header>
                  )}
                </Col>
                <Col>
                  <h5>{product.price} VNĐ</h5>
                </Col>
              </Row>
              <Row>
                <Col xs={1} sm={3} md={5} lg={5}>
                  {size === 0 && (
                    <MdAllInbox className='long-product-label-icon' />
                  )}
                  {size > 0 && (
                    <header className='long-product-label'>In store</header>
                  )}
                </Col>
                <Col>
                  <h5>7 portions</h5>
                </Col>
              </Row>
              <Row>
                <Col xs={1} sm={3} md={5} lg={5}>
                  {size === 0 && (
                    <MdAccessTime className='long-product-label-icon' />
                  )}
                  {size > 0 && (
                    <header className='long-product-label'>Time left</header>
                  )}
                </Col>
                <Col>
                  <h5>2 days</h5>
                </Col>
              </Row>
            </Col>
            
          </Row>
        </Card>
      </Col>
      
      <Col className='px-0' md={1} lg={1}>
        <Card className='long-product-tail align-items-center'>
          <MdDeleteOutline className='long-product-icon my-auto' />
        </Card>
      </Col>
    </Row>
  );
};

export default ProductItem;
