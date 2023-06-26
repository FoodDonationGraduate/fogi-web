// Essentials
import * as React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

// Components
import ProductImage from './ProductImage';
import ProductDetails from './ProductDetails';

// Styling
import 'assets/css/Fogi.css';

const ProductSection = ({product}) => {
  return (
    <Container className='py-4'>
      <Row>
        <Col md={4} lg={4}>
          <ProductImage product={product} />
        </Col>
        <Col>
          <ProductDetails product={product} />
        </Col>
      </Row>  
    </Container>
  );
};

export default ProductSection;
