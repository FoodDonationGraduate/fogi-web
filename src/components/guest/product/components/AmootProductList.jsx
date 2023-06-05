// Essentials
import * as React from 'react';
import { useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { EqualHeight } from 'react-equal-height';

// Components
import ProductCard from 'components/guest/common/cards/ProductCard';
import FogiPagination from 'components/common/pagination/Pagination';
import { retrieveAmootProducts } from 'components/redux/reducer/ProductReducer';
import CommonNotFoundBody from 'components/common/CommonNotFoundBody';

const ProductList = () => {
  const amootProducts = useSelector(state => state.productReducer.amootProducts)
  const sort = useSelector(state => state.productReducer.sort)
  const PRODUCT_COUNT = 12; // per page
  const [page, setPage] = useState(0); // a.k.a activeIdx
  const onChangePage = async (idx) => {
    setPage(idx);
    await dispatch(retrieveAmootProducts({limit: PRODUCT_COUNT, offset: idx * PRODUCT_COUNT, sort_field: sort}, navigate))
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(()=>{
    dispatch(retrieveAmootProducts({limit: PRODUCT_COUNT, offset: page * PRODUCT_COUNT, sort_field: sort}, navigate))
  }, [sort])
  return (
    <div className='bg'>
      {(Object.keys(amootProducts).length !== 0 && amootProducts.total_products !== 0) && 
        <Container style={{minHeight: '600px'}}>
          <Row className='pt-4' xs={2} sm={3} md={4} xl={6}>
          <EqualHeight>
            {amootProducts.products.map((product) => (
              <Col className='pb-4' key={product.id}>
                <ProductCard product={product}/>
              </Col>
            ))}
          </EqualHeight>
          </Row>
          <Row className='pb-4'>
            <Col className='d-flex justify-content-center'>
              <FogiPagination
                pageCount={Math.ceil(amootProducts.total_products / PRODUCT_COUNT)}
                activeIdx={page}
                onChangePage={onChangePage}
              />
            </Col>
          </Row>
        </Container>
      }
      {(Object.keys(amootProducts).length === 0 || amootProducts.total_products === 0) && 
        <CommonNotFoundBody title='Vui lòng thử lại sau'/>
      }
    </div>
  );
};

export default ProductList;
