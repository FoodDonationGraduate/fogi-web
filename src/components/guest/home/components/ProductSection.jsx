// Essentials
import * as React from 'react';
import { Button, Container, Col, Row } from 'react-bootstrap';

// Components
import ProductCard from 'components/guest/common/cards/ProductCard';

// Styling
import 'assets/css/Fogi.css';

// Data
import { PRODUCT_DATA } from 'utils/constants/Product.jsx'

const ProductSection = () => {
  return (
    <div className='bg'>
      <Container>
        <Row className='pt-4'>
          <Col>
            <h2>Almost out of stock</h2>
          </Col>
        </Row>
        <Row className='py-3' xs={2} md={3} lg={6} >
          {PRODUCT_DATA.map((product) => (
            <Col>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
        <Row>
          <Col className='d-flex justify-content-center'>
            <Button variant='light'>View more</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductSection;
