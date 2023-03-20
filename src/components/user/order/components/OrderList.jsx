// Essentials
import * as React from 'react';
import { useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { EqualHeight } from 'react-equal-height';

// Components
import OrderItem from './OrderItem';
import Pagination from 'components/common/pagination/Pagination';

// Data
import { ORDER_DATA } from 'utils/constants/Order.jsx';

const OrderList = () => {
  const ORDER_COUNT = 9; // per page
  const [page, setPage] = useState(0); // a.k.a activeIdx
  const onChangePage = (idx) => {
    setPage(idx);
  };

  return (
    <Container>
      <Row>
        <Col className='px-0'>
          <Row className='mb-4' xs={1} md={2} lg={3}>
            <EqualHeight>
              {ORDER_DATA.slice(page * ORDER_COUNT, (page + 1) * ORDER_COUNT).map((order, key) => (
                <Col className='mb-4' key={key}>
                  <OrderItem order={order} />
                </Col>
              ))}
            </EqualHeight>
          </Row>
          <div className='d-flex justify-content-center'>
            <Pagination
              pageCount={Math.ceil(ORDER_DATA.length / ORDER_COUNT)}
              activeIdx={page}
              onChangePage={onChangePage}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderList;
