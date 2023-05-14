// Essentials
import * as React from 'react';
import { Card, Col, Row, Stack } from 'react-bootstrap';

// Assets
import { MdDeleteOutline, MdAccessTime, MdAllInbox, MdMonetizationOn } from 'react-icons/md';
import ProductImage from 'assets/images/ProductImage.jpg'; // temporary

// Utility
import { useResizer } from 'utils/helpers/Resizer.jsx';
import { distanceTime } from 'utils/helpers/Time';
const ProductItem = ({
  product
}) => {

  let size = useResizer();

  return (
    <Row>
      <Col className='px-0'>
        <Card className='long-product-item long-product-donor'>
          <Row>
            <Col className='ps-0' xs={12} lg={4} xl={6}>
              <Stack direction='horizontal'>
                <img
                  className='long-product-image'
                  src={`https://bachkhoi.online/static/${product.image_filename}`}
                  width='128' height='128'
                />
                <div className='ms-4'>
                  <h5 className='fw-bold mb-3'>
                    {product.name}
                  </h5>
                  <span className={size > 0 ? 'long-product-type' : 'long-product-type-sm'}>
                    {product.category_name}
                  </span>
                </div>
              </Stack>
            </Col>
            
            <Col className={`my-auto ${size <= 2 && 'ps-0 pt-4'}`} xs={12} md={6} lg={4} xl={3}>
              <Row>
                <Col xs={1} sm={3} md={5} lg={5}>
                  {size === 0 && (
                    <MdAccessTime className='long-product-label-icon' />
                  )}
                  {size > 0 && (
                    <header className='long-product-label'>Còn</header>
                  )}
                </Col>
                <Col>
                  <h5>{distanceTime(product.expired_time)}</h5>
                </Col>
              </Row>
              <Row>
                <Col xs={1} sm={3} md={5} lg={5}>
                  {size === 0 && (
                    <MdAllInbox className='long-product-label-icon' />
                  )}
                  {size > 0 && (
                    <header className='long-product-label'>Số lượng</header>
                  )}
                </Col>
                <Col>
                  <h5>{product.quantity} {product.unit}</h5>
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
