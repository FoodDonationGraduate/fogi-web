// Essentials
import * as React from 'react';
import { useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';

// Components
import ProductItem from './ProductItem';
import Pagination from 'components/common/pagination/Pagination';

const ProductList = (
  {products}
) => {
  const PRODUCT_COUNT = 4; // per page
  const [page, setPage] = useState(0); // a.k.a activeIdx
  const onChangePage = (idx) => {
    setPage(idx);
  };

  return (
    <Container>
      <Row>
        <Col>
          <div className='mb-4'>
            {Object.keys(products).length !== 0 && products.slice(page * PRODUCT_COUNT, (page + 1) * PRODUCT_COUNT).map((product) => (
              <div className='mb-3' key={product.image_filename}>
                <ProductItem product={product} />
              </div>
            ))}
          </div>
          <div className='d-flex justify-content-center'>
            <Pagination
              pageCount={Math.ceil(products.length / PRODUCT_COUNT)}
              activeIdx={page}
              onChangePage={onChangePage}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductList;
