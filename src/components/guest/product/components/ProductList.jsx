// Essentials
import * as React from 'react';
import { useState } from 'react';
import { Container, Col, Pagination, Row } from 'react-bootstrap';

// Components
import ProductCard from 'components/guest/common/cards/ProductCard';

// Data
import { PRODUCT_DATA } from 'utils/constants/ProductLarge.jsx'

const ProductList = () => {
  const ITEM_COUNT = 18; // per page
  const [page, setPage] = useState(0);
  const changePage = (idx) => {
    setPage(idx);
  };

  return (
    <div className='bg'>
      <Container>
        <Row className='py-4' xs={2} md={3} lg={6} >
          {PRODUCT_DATA.slice(page * ITEM_COUNT, (page + 1) * ITEM_COUNT).map((product) => (
            <Col>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
        <Row>
          <Col className='d-flex justify-content-center'>
            <Pagination>
              {Array.from({ length: Math.ceil(PRODUCT_DATA.length / ITEM_COUNT) }).map((_, idx) => (
                <Pagination.Item
                  key={idx}
                  active={idx === page}
                  onClick={() => changePage(idx)}
                >
                  {idx + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductList;
