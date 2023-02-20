// Essentials
import * as React from 'react';
import { Container, Col, Pagination, Row } from 'react-bootstrap';

// Components
import ProductCard from 'components/guest/common/cards/ProductCard';

// Data
import { PRODUCT_DATA } from 'utils/constants/Product.jsx'

const ProductList = () => {
  return (
    <div className='bg'>
      <Container>
        <Row className='py-4' xs={2} md={3} lg={6} >
          {PRODUCT_DATA.map((product) => (
            <Col>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
        <Row>
          <Col className='d-flex justify-content-center'>
            <Pagination>
              <Pagination.Item>1</Pagination.Item>
              <Pagination.Item>2</Pagination.Item>
              <Pagination.Item>3</Pagination.Item>
            </Pagination>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductList;
