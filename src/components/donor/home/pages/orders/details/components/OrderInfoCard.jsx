// Essentials
import React from 'react';
import { Button, Container, Col, Row, Stack } from 'react-bootstrap';

// Utility
import { useResizer } from 'utils/helpers/Resizer.jsx';
import { convertNumberToVnd } from 'utils/helpers/Money.jsx';
import { getStatus, getStep } from 'utils/helpers/Order.jsx';

const CartInfoCard = ({ order }) => {
  let size = useResizer();

  return (
    <>
      <Container>
        <Row>
          <Col>
            <div className='order-info-card'>
              <span
                className={`order-item-status order-item-status-${getStatus(order).css}`}
              >
                {getStatus(order).label}
              </span>
              <h3 className='order-item-date mt-3'>
                Ordered on {order.date}
              </h3>
              <h4 className='order-info-total'>
                {size > 0 && 'Total cost: '}{convertNumberToVnd(order.total)}
              </h4>
              <header className='order-item-secondary'>
                Ordered at {order.address}
              </header>

              <hr />

              <Row>
                <Col className='ps-0'>
                  <Stack direction='horizontal' gap={4}>
                    <img className='order-info-donor-logo' src={order.donee.avatar} />
                    <Stack className='my-auto' direction='vertical' gap={1}>
                      <h5 className='fw-bold'>{order.donee.name}</h5>
                    </Stack>
                  </Stack>
                </Col>
                <Col className='px-0' sm={2}>
                  <div className={size > 0 ? 'h-100 d-flex' : 'd-grid'}>
                    <Button
                      className={size > 0 ? 'my-auto me-0 ms-auto' : 'mt-4'}
                      variant='outline-secondary'
                    >
                      View Donee
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CartInfoCard;
