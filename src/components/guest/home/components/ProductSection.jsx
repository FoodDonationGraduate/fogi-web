// Essentials
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, Container, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux'
import { EqualHeight } from 'react-equal-height';

// Components
import ProductCard from 'components/guest/common/cards/ProductCard';
import { retrieveAmootProducts, retrieveNewProducts } from 'components/redux/reducer/ProductReducer';

// Styling
import 'assets/css/Fogi.css';

// Utility
import { useResizer } from 'utils/helpers/Resizer';

const ProductSection = ({ type }) => {
  const PRODUCT_LENGTH = 6;

  const newProducts = useSelector(state => state.productReducer.newProducts);
  const amootProducts = useSelector(state => state.productReducer.amootProducts);
  const products = type === 0 ? newProducts : amootProducts;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  React.useEffect(()=>{
    if (type === 0) dispatch(retrieveNewProducts({limit: PRODUCT_LENGTH, offset: 0, sort_field: ''}, navigate));
    else dispatch(retrieveAmootProducts({limit: PRODUCT_LENGTH, offset: 0, sort_field: ''}, navigate));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    if (Object.keys(products).length !== 0) {
      setShownProducts(products.products.slice(0, length));
    }
  }, [size, products]);

  const toProductList = () => {
    if (type === 0) navigate('/new-products');
    else navigate('/almost-out-of-stock-products');
  };

  return (
    <div className='bg'>
      {(Object.keys(products).length !== 0 && products.total_products !== 0) && 
        <Container>
          <Row className='pt-4 py-2'>
            <Col>
              {type === 0 ? 
                <h2>Thực phẩm mới</h2>
                :
                <h2>Thực phẩm sắp hết hàng</h2>
              }
            </Col>
          </Row>
          <Row xs={2} sm={3} md={4} xl={6}>
            <EqualHeight>
              {Object.keys(products).length !== 0 && shownProducts.map((product) => (
                <Col className='pb-4' key={product.id}>
                  <ProductCard product={product}/>
                </Col>
              ))}
            </EqualHeight>
          </Row>
          <Row>
            <Col className='d-flex justify-content-center'>
              <Button variant='light' onClick={toProductList}>Xem thêm</Button>
            </Col>
          </Row>
        </Container>
      }
    </div>
  );
};

export default ProductSection;
