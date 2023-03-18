// Essentials
import * as React from 'react';
import { Button, Container, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux'
import { EqualHeight } from 'react-equal-height';

// Components
import ProductCard from 'components/guest/common/cards/ProductCard';
import { retrieveAmootProducts } from 'components/redux/reducer/ProductReducer';

// Styling
import 'assets/css/Fogi.css';

const ProductSection = () => {
  const PRODUCT_COUNT = 6; // per page

  const amootProducts = useSelector(state => state.productReducer.amootProducts)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  React.useEffect(()=>{
    dispatch(retrieveAmootProducts({limit: PRODUCT_COUNT, offset: 0, sort_field: ''}, navigate))
  }, [])
  return (
    <div className='bg'>
      <Container>
        <Row className='pt-4'>
          <Col>
            <h2>Almost out of stock</h2>
          </Col>
        </Row>
        <Row xs={2} md={3} lg={6} >
          <EqualHeight>
            {Object.keys(amootProducts).length !== 0 && 
              amootProducts.products.map((product, idx) => (
                <Col className='pb-4' key={product.id}>
                  <ProductCard product={product}/>
                </Col>
              ))
            }
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
