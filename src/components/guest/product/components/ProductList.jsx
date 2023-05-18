// Essentials
import * as React from 'react';
import { useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router';
import { EqualHeight } from 'react-equal-height';

// Components
import ProductCard from 'components/guest/common/cards/ProductCard';
import FogiPagination from 'components/common/pagination/Pagination';
import { searchProduct } from 'components/redux/reducer/ProductReducer';
import EmptyProductBody from './EmptyProductBody';

const ProductList = () => {
  const searchingProducts = useSelector(state => state.productReducer.searchingProducts)
  const sort = useSelector(state => state.productReducer.sort)

  const search = useLocation().search;
  const query = new URLSearchParams(search).get('query');

  const PRODUCT_COUNT = 12; // per page
  const [page, setPage] = useState(0); // a.k.a activeIdx
  const onChangePage = async (idx) => {
    setPage(idx);
    await dispatch(searchProduct({query: query ? query : '', limit: PRODUCT_COUNT, offset: idx * PRODUCT_COUNT, sort_field: sort}, navigate))
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(searchProduct({query: query ? query : '', limit: PRODUCT_COUNT, offset: page * PRODUCT_COUNT, sort_field: sort}, navigate))
  }, [sort, query])

  return (
    <div className='bg'>
      {Object.keys(searchingProducts).length !== 0 && searchingProducts.number_of_products !== 0 &&
        <Container>
          <Row className='pt-4' xs={2} md={3} lg={6} >
            <EqualHeight>
              {searchingProducts.products.map((product) => (
                <Col className='pb-4' key={product.id}>
                  <ProductCard product={product}/>
                </Col>
              ))}
            </EqualHeight>
          </Row>
          <Row className='pb-4'>
            <Col className='d-flex justify-content-center'>
              <FogiPagination
                pageCount={Math.ceil(searchingProducts.total_products / PRODUCT_COUNT)}
                activeIdx={page}
                onChangePage={onChangePage}
              />
            </Col>
          </Row>
        </Container>
      }
      {Object.keys(searchingProducts).length === 0 || searchingProducts.number_of_products === 0  && 
        <EmptyProductBody/>
      }
    </div>
  );
};

export default ProductList;
