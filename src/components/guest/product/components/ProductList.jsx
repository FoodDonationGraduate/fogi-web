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


const ProductList = () => {
  const searchingProducts = useSelector(state => state.productReducer.searchingProducts)
  const sort = useSelector(state => state.productReducer.sort)

  const search = useLocation().search;
  const name = new URLSearchParams(search).get('query');

  const PRODUCT_COUNT = 12; // per page
  const [page, setPage] = useState(0); // a.k.a activeIdx
  const onChangePage = async (idx) => {
    setPage(idx);
    await dispatch(searchProduct({name: name ? name : '', limit: PRODUCT_COUNT, offset: idx * PRODUCT_COUNT, sort_field: sort}, navigate))
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(searchProduct({name: name ? name : '', limit: PRODUCT_COUNT, offset: page * PRODUCT_COUNT, sort_field: sort}, navigate))
  }, [sort])

  return (
    <div className='bg'>
      <Container>
        <Row className='pt-4' xs={2} md={3} lg={6} >
        <EqualHeight>
          {Object.keys(searchingProducts).length !== 0 && searchingProducts.products.map((product) => (
            <Col className='pb-4' key={product.id}>
              <ProductCard product={product}/>
            </Col>
          ))}
          {searchingProducts.number_of_products === 0 && <div>We cannot find anything</div>
          }
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
    </div>
  );
};

export default ProductList;
