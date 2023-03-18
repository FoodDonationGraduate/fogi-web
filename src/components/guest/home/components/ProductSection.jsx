// Essentials
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, Container, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux'
import { EqualHeight } from 'react-equal-height';

// Components
import ProductCard from 'components/guest/common/cards/ProductCard';
import { retrieveAmootProducts } from 'components/redux/reducer/ProductReducer';

// Styling
import 'assets/css/Fogi.css';

// Utility
import { useResizer } from 'utils/helpers/Resizer';

const ProductSection = () => {
  const PRODUCT_LENGTH = 6;

  const amootProducts = useSelector(state => state.productReducer.amootProducts)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  React.useEffect(()=>{
    dispatch(retrieveAmootProducts({limit: PRODUCT_LENGTH, offset: 0, sort_field: ''}, navigate))
  }, []);

  // Responsive handling
  let size = useResizer();

  const [shownProducts, setShownProducts] = useState([]);

  useEffect(() => {
    let length = 6;
    switch (size) {
      case 2: length = 4; break;
      case 3: length = 4; break;
      default: length = 6;
    }
    if (Object.keys(amootProducts).length !== 0) {
      setShownProducts(amootProducts.products.slice(0, length));
    }
  }, [size, amootProducts]);

  return (
    <div className='bg'>
      <Container>
        <Row className='pt-4'>
          <Col>
            <h2>Almost out of stock</h2>
          </Col>
        </Row>
        <Row xs={2} sm={3} md={4} xl={6}>
          <EqualHeight>
            {Object.keys(amootProducts).length !== 0 && shownProducts.map((product) => (
              <Col className='pb-4'>
                <ProductCard product={product} key={product.id}/>
              </Col>
            ))}
          </EqualHeight>
        </Row>
        <Row>
          <Col className='d-flex justify-content-center'>
            <Button variant='light' onClick={() => navigate('/almost-out-of-stock-products')}>View more</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductSection;
