// Essentials
import * as React from 'react';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';

// Components
import ProductItem from './ProductItem';
import FogiPagination from 'components/common/pagination/Pagination';
import { retrieveDonorProducts } from 'components/redux/reducer/ProductReducer';

const ProductList = () => {
  const userInfo = useSelector(state => state.authenticationReducer.user)
  const donorProducts = useSelector(state => state.productReducer.donorProducts)

  const PRODUCT_COUNT = 4; // per page
  const [page, setPage] = useState(0); // a.k.a activeIdx
  const onChangePage = async (idx) => {
    setPage(idx);
    await dispatch(retrieveDonorProducts({limit: PRODUCT_COUNT, offset: idx * PRODUCT_COUNT, email: userInfo.email}, navigate))
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(()=>{
    dispatch(retrieveDonorProducts({limit: PRODUCT_COUNT, offset: page * PRODUCT_COUNT, email: userInfo.email}, navigate))
  }, [])

  return (
    <Row>
      <Col className='px-0'>
        <div className='mb-4'>
          {Object.keys(donorProducts).length !== 0 && donorProducts.products.map((product) => (
            <div className='mb-2'>
              <ProductItem product={product} key={product.id}/>
            </div>
          ))}
        </div>
        <div className='d-flex justify-content-center'>
          {Object.keys(donorProducts).length !== 0 && 
            <FogiPagination
            pageCount={donorProducts.total_products ? Math.ceil(donorProducts.total_products / PRODUCT_COUNT) : 1}
            activeIdx={page}
            onChangePage={onChangePage}
            />
          }
        </div>
      </Col>
    </Row>
  );
};

export default ProductList;
