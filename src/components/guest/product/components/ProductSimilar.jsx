// Essentials
import React, { useState, useEffect } from 'react';
import { Button, Container, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux'
import { EqualHeight } from 'react-equal-height';

// Components
import ProductCard from 'components/guest/common/cards/ProductCard';
import { retrieveVolunteerProducts } from 'components/redux/reducer/ProductReducer';

// Styling
import 'assets/css/Fogi.css';

// Utility
import { useResizer } from 'utils/helpers/Resizer';

const ProductSimilar = ({ product }) => {
  const products = useSelector(state => state.productReducer.volunteerProducts);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(()=>{
    dispatch(retrieveVolunteerProducts(
      {
        username: product.volunteer.username,
        limit: 7,
        offset: 0
      },
      {},
      navigate
    ));
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
      setShownProducts(products.products.filter(p => p.id !== product.id).slice(0, length));
    }
  }, [size, product, products]);

  const toProductList = () => {
    navigate(`/volunteer/${product.volunteer.username}`);
  };

  return (
    <div className='bg pb-4'>
      <Container>
        <Row className='pt-4 py-2'>
          <Col>
            <h2>Thực phẩm cùng Tình nguyện viên</h2>
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
    </div>
  );
};

export default ProductSimilar;
