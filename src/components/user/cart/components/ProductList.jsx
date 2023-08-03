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

const ProductList = ({ setIsError, overStockPage, setOverStockPage }) => {
  const allProducts = useSelector(state => state.cartReducer.allProducts)
  const userInfo = useSelector(state => state.authenticationReducer.user)
  const userToken = useSelector(state => state.authenticationReducer.token)
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const PRODUCT_COUNT = 4; // per page
  const [page, setPage] = useState(0); // a.k.a activeIdx

  // Check if quantity > stock
  const [overStock, setOverStock] = useState([]);

  useEffect(() => {
    if (Object.keys(allProducts).length === 0) return;
    setOverStockPage(allProducts.invalid_cart_pages);
    setOverStock(allProducts.invalid_cart_item_ids);
  }, [allProducts]);

  const onChangePage = (idx) => {
    setPage(idx);
  };

  useEffect(()=>{
    dispatch(retrieveAllProducts({limit: PRODUCT_COUNT, offset: page * PRODUCT_COUNT}, {userInfo, userToken}, navigate));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    if (Object.keys(allProducts).length === 0) return;

    let isValidPage = true; // current page is valid
    for (let i = 0; i < allProducts.cart.length; i++) {
      if (overStock.includes(allProducts.cart[i].id)) {
        isValidPage = false;
        if (!overStockPage.includes(page)) {
          setOverStockPage([...overStockPage, page]);
        }
        break;
      }
    }

    if (isValidPage) {
      setOverStockPage(overStockPage.filter(p => p != page));
    }

    if (overStock.length === 0) setIsError(false);
    else setIsError(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps  
  }, [overStock]);

  return (<>
    <Container>
      {(Object.keys(allProducts).length !== 0 && allProducts.total_cart_items !== 0) &&
        <Row>
          <Col>
            <div className='mb-4'>
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
  </>);
};

export default ProductList;
