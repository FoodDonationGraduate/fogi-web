// Essentials
import * as React from 'react';
import { useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

// Components
import ProductItem from './ProductItem';
import Pagination from 'components/common/pagination/Pagination';
import { retrieveAllProducts } from 'components/redux/reducer/CartReducer';

// Data
import { PRODUCT_DATA } from 'utils/constants/ProductLarge.jsx';

const ProductList = () => {
  const allProducts = useSelector(state => state.cartReducer.allProducts)
  const userInfo = useSelector(state => state.authenticationReducer.user)
  const userToken = useSelector(state => state.authenticationReducer.token)
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const PRODUCT_COUNT = 4; // per page
  const [page, setPage] = useState(0); // a.k.a activeIdx

  const onChangePage = async (idx) => {
    setPage(idx);
    await dispatch(retrieveAllProducts({limit: PRODUCT_COUNT, offset: idx * PRODUCT_COUNT}, {userInfo, userToken}, navigate))
  };

  React.useEffect(()=>{
    dispatch(retrieveAllProducts({limit: PRODUCT_COUNT, offset: page * PRODUCT_COUNT}, {userInfo, userToken}, navigate))
  }, [])

  return (
    <Container>
      <Row>
        <Col>
          <div className='mb-4'>
            {Object.keys(allProducts).length !== 0 && allProducts.cart.slice(page * PRODUCT_COUNT, (page + 1) * PRODUCT_COUNT).map((product) => (
              <div className='mb-3' key={product.image_filename}>
                <ProductItem product={product} />
              </div>
            ))}
          </div>
          <div className='d-flex justify-content-center'>
            <Pagination
              pageCount={Math.ceil(allProducts.total_cart_items / PRODUCT_COUNT)}
              activeIdx={page}
              onChangePage={onChangePage}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductList;
