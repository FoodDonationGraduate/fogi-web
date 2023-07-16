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
import CommonNotFoundBody from 'components/common/CommonNotFoundBody';

const ProductList = ({setMinExpiredDate}) => {
  const userInfo = useSelector(state => state.authenticationReducer.user)
  const userToken = useSelector(state => state.authenticationReducer.token)
  const donorProducts = useSelector(state => state.productReducer.donorProducts)

  const PRODUCT_COUNT = 4; // per page
  const [page, setPage] = useState(0); // a.k.a activeIdx
  const onChangePage = async (idx) => {
    setPage(idx);
    await dispatch(retrieveDonorProducts({limit: PRODUCT_COUNT, offset: idx * PRODUCT_COUNT}, {userInfo, userToken}, navigate))
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(()=>{
    dispatch(retrieveDonorProducts({limit: PRODUCT_COUNT, offset: page * PRODUCT_COUNT}, {userInfo, userToken}, navigate))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(()=>{
    if (Object.keys(donorProducts).length !== 0 && donorProducts.total_products !== 0) {
      setMinExpiredDate(donorProducts.products.reduce((min, product)=>{
        return product.expired_time < min.expired_time ? product : min 
      }).expired_time)
    } else {
      setMinExpiredDate('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [donorProducts])

  return (
    <Row>
      {(Object.keys(donorProducts).length !== 0 && donorProducts.total_products !== 0) &&
        <Col className='px-0'>
          <div className='mb-4' style={{minHeight: '600px'}}>
            {donorProducts.products.map((product) => (
              <div className='mb-2' key={product.id}>
                <ProductItem product={product} />
              </div>
            ))}
          </div>
          <div className='d-flex justify-content-center'>
            <FogiPagination
              pageCount={donorProducts.total_products ? Math.ceil(donorProducts.total_products / PRODUCT_COUNT) : 1}
              activeIdx={page}
              onChangePage={onChangePage}
            />
          </div>
        </Col>
      }
      {(Object.keys(donorProducts).length === 0 || donorProducts.total_products === 0) && 
        <CommonNotFoundBody title='Bạn chưa thêm mới thực phẩm nào'/>
      }
    </Row>
  );
};

export default ProductList;
