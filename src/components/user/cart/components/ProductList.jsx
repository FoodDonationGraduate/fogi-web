// Essentials
import React, { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

// Components
import ProductItem from './ProductItem';
import Pagination from 'components/common/pagination/Pagination';
import { retrieveAllProducts } from 'components/redux/reducer/CartReducer';
import CommonNotFoundBody from 'components/common/CommonNotFoundBody';

const ProductList = ({ setIsError }) => {
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

  useEffect(()=>{
    dispatch(retrieveAllProducts({limit: PRODUCT_COUNT, offset: page * PRODUCT_COUNT}, {userInfo, userToken}, navigate));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Check if quantity > stock
  const [overStock, setOverStock] = useState([]);

  useEffect(() => {
    for (let i = 0; i < allProducts.number_of_cart_items; i++) {
      const p = allProducts.cart[i];
      if (p.quantity < 1 || p.quantity > p.stock) {
        if (!overStock.includes(p.id)) setOverStock([...overStock, p.id]);
      }
    }
    if (overStock.length > 0) setIsError(true);
  }, [allProducts]);

  useEffect(() => {
    if (overStock.length === 0) setIsError(false);
    else setIsError(true);
  }, [overStock]);

  return (
    <Container>
      {(Object.keys(allProducts).length !== 0 && allProducts.total_cart_items !== 0) &&
        <Row>
          <Col>
            <div className='mb-4' style={{minHeight: '400px'}}>
              {allProducts.cart.map((product) => (
                <div className='mb-3' key={product.id}>
                  <ProductItem
                    product={product}
                    overStock={overStock}
                    setOverStock={setOverStock}
                  />
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
      }
      {(Object.keys(allProducts).length === 0 || allProducts.total_cart_items === 0) && 
        <CommonNotFoundBody title='Bạn chưa có Thực phẩm nào trong túi' />
      }
    </Container>
  );
};

export default ProductList;
