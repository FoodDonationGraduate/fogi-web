// Essentials
import React, { useState, useEffect } from 'react';
import { Button, Container, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux'
import { EqualHeight } from 'react-equal-height';

// Components
import ProductCard from 'components/guest/common/cards/ProductCard';
import { retrieveCategoryProductsById } from 'components/redux/reducer/ProductReducer';

// Styling
import 'assets/css/Fogi.css';

// Utility
import { useResizer } from 'utils/helpers/Resizer';

const ProductSimilar = ({ product }) => {
  let size = useResizer();
  const dispatch = useDispatch(); const navigate = useNavigate();

  const products = useSelector(state => state.productReducer.categoryProducts);
  
  useEffect(()=>{
    dispatch(retrieveCategoryProductsById(
      {
        category_id: product.category.id,
        limit: 7,
        offset: 0,
        sort_field: 'stock'
      },
      navigate
    ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

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
    navigate(`/category/${product.category.name}`);
  };

  return (
    <div className='bg pb-4'>
      <Container>
        <Row className='pt-4 py-2'>
          <Col>
            <h2>Thực phẩm cùng Hạng mục</h2>
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
          {Object.keys(products).length > 0 && products.total_products > 6 && shownProducts.length === 6 &&
            <Col className='d-flex justify-content-center'>
              <Button variant='light' onClick={toProductList}>Xem thêm</Button>
            </Col>
          }
        </Row>
      </Container>
    </div>
  );
};

export default ProductSimilar;
