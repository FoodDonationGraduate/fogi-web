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
import { retrieveVolunteerProducts } from 'components/redux/reducer/ProductReducer';
import EmptyProductBody from './EmptyProductBody';
import VolunteerCard from './VolunteerCard';

const ProductList = () => {
  const volunteerProducts = useSelector(state => state.productReducer.volunteerProducts)
  const { name } = useParams()
  const sort = useSelector(state => state.productReducer.sort)
  const PRODUCT_COUNT = 12; // per page
  const [page, setPage] = useState(0); // a.k.a activeIdx

  const onChangePage = async (idx) => {
    setPage(idx);
    await dispatch(retrieveVolunteerProducts({username: name, limit: PRODUCT_COUNT, offset: idx * PRODUCT_COUNT, sort_field: sort}, navigate))
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(()=>{
    dispatch(retrieveVolunteerProducts({username: name, limit: PRODUCT_COUNT, offset: page * PRODUCT_COUNT, sort_field: sort}, navigate))
  }, [sort])
  return (
    <div className='bg'>
      {(Object.keys(volunteerProducts).length !== 0) && 
        <Container style={{minHeight: '600px'}}>
          <Row className='pt-4'>
            <Col>
              <VolunteerCard isCard={true} volunteerInfo={volunteerProducts.volunteer} />
            </Col>
          </Row>
          <Row className='pt-4' xs={2} sm={3} md={4} xl={6}>
            <EqualHeight>
              {volunteerProducts.total_products !== 0 && volunteerProducts.products.map((product) => (
                <Col className='pb-4' key={product.id}>
                  <ProductCard product={product}/>
                </Col>
              ))}
            </EqualHeight>
          </Row>
          <Row className='pb-4'>
            {volunteerProducts.total_products !== 0 && 
              <Col className='d-flex justify-content-center'>
                <FogiPagination
                  pageCount={Math.ceil(volunteerProducts.total_products / PRODUCT_COUNT)}
                  activeIdx={page}
                  onChangePage={onChangePage}
                />
              </Col>
            }
          </Row>
        </Container>
      }
      {(Object.keys(volunteerProducts).length === 0 || volunteerProducts.total_products === 0) && 
        <EmptyProductBody/>
      }
    </div>
  );
};

export default ProductList;