// Essentials
import * as React from 'react';
import { useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { EqualHeight } from 'react-equal-height';
import { useParams } from 'react-router-dom'

// Components
import ProductCard from 'components/guest/common/cards/ProductCard';
import FogiPagination from 'components/common/pagination/Pagination';
import { retrieveCategoryProductsById } from 'components/redux/reducer/ProductReducer';
import EmptyProductBody from './EmptyProductBody';
import ListTitle from './ListTitle';

// Reducer
import { retrieveCategory } from 'components/redux/reducer/CategoryReducer';

const ProductList = () => {
  const categoryProducts = useSelector(state => state.productReducer.categoryProducts);
  const currentCategory = useSelector(state => state.categoryReducer.currentCategory);
  const { id } = useParams()
  const sort = useSelector(state => state.productReducer.sort)
  const PRODUCT_COUNT = 12; // per page
  const [page, setPage] = useState(0); // a.k.a activeIdx

  const onChangePage = (idx) => {
    setPage(idx);
    dispatch(retrieveCategoryProductsById({category_id: id, limit: PRODUCT_COUNT, offset: idx * PRODUCT_COUNT, sort_field: sort}, navigate))
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(()=>{
    dispatch(retrieveCategoryProductsById({ category_id: id, limit: PRODUCT_COUNT, offset: page * PRODUCT_COUNT, sort_field: sort}, navigate))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort])

  React.useEffect(() => {
    dispatch(retrieveCategory({ id }, navigate));
  }, [id]);
  return (
    <div className='bg'>
      <Container>
        <Row className='pt-4'>
          <Col>
            <h2>{currentCategory.category ? currentCategory.category.name : ''}</h2>
          </Col>
        </Row>
      </Container>
      {(Object.keys(categoryProducts).length !== 0 && categoryProducts.total_products !== 0) && 
        <Container style={{minHeight: '600px'}}>
          <Row className='pt-4' xs={2} sm={3} md={4} xl={6}>
          <EqualHeight>
            {Object.keys(categoryProducts).length !== 0 && categoryProducts.products.map((product) => (
              <Col className='pb-4' key={product.id}>
                <ProductCard product={product}/>
              </Col>
            ))}
          </EqualHeight>
          </Row>
          <Row className='pb-4'>
            <Col className='d-flex justify-content-center'>
              <FogiPagination
                pageCount={Math.ceil(categoryProducts.total_products / PRODUCT_COUNT)}
                activeIdx={page}
                onChangePage={onChangePage}
              />
            </Col>
          </Row>
        </Container>
      }
      {(Object.keys(categoryProducts).length === 0 || categoryProducts.total_products === 0) && 
        <EmptyProductBody/>
      }
    </div>
  );
};

export default ProductList;
