// Essentials
import * as React from 'react';
import { useState } from 'react';
import { Container, Col, Pagination, Row } from 'react-bootstrap';

// Components
import ProductCard from 'components/guest/common/cards/ProductCard';
import FogiPagination from 'components/common/pagination/Pagination';

// Data
import { PRODUCT_DATA } from 'utils/constants/ProductLarge.jsx'

const ProductList = () => {
  const PRODUCT_COUNT = 18; // per page
  const [page, setPage] = useState(0); // a.k.a activeIdx
  const onChangePage = (idx) => {
    setPage(idx);
  };

  return (
    <div className='bg'>
      <Container>
        <Row className='pt-4' xs={2} md={3} lg={6} >
          {PRODUCT_DATA.slice(page * PRODUCT_COUNT, (page + 1) * PRODUCT_COUNT).map((product) => (
            <Col className='pb-4'>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
        {/* <Row>
          <Col className='d-flex justify-content-center'>
            <Pagination>
              {Array.from({ length: Math.ceil(PRODUCT_DATA.length / PRODUCT_COUNT) }).map((_, idx) => (
                <Pagination.Item
                  key={idx}
                  active={idx === page}
                  onClick={() => onChangePage(idx)}
                >
                  {idx + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </Col>
        </Row> */}
        <Row className='pb-4'>
          <Col className='d-flex justify-content-center'>
            <FogiPagination
              pageCount={Math.ceil(PRODUCT_DATA.length / PRODUCT_COUNT)}
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
