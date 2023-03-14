// Essentials
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';

// Components
import ProductCard from 'components/guest/common/cards/ProductCard';

// Styling
import 'assets/css/Fogi.css';

// Utility
import { useResizer } from 'utils/helpers/Resizer';

// Data
import { PRODUCT_DATA } from 'utils/constants/Product.jsx'

const ProductSection = () => {
  let size = useResizer();

  const [shownProducts, setShownProducts] = useState(PRODUCT_DATA.slice(0, 6));

  useEffect(() => {
    let length = 6;
    switch (size) {
      case 3: length = 4; break;
    }
    setShownProducts(PRODUCT_DATA.slice(0, length));
  }, [size]);

  return (
    <div className='bg'>
      <Row className='pt-4'>
        <Col>
          <h2>Almost out of stock</h2>
        </Col>
      </Row>
      <Row className='py-3' xs={2} md={3} lg={4} xl={6}>
        {shownProducts.map((product) => (
          <Col className={size !== 3 && 'mb-4'}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
      <Row>
        <Col className='d-flex justify-content-center'>
          <Button variant='light'>View more</Button>
        </Col>
      </Row>
    </div>
  );
};

export default ProductSection;
