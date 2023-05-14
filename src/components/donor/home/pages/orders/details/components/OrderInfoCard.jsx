// Essentials
import React from 'react';
import { Button, Container, Col, Row, Stack } from 'react-bootstrap';

// Components
import StepItem from './StepItem';

// Utility
import { useResizer } from 'utils/helpers/Resizer.jsx';
import { getStatus, getStep } from 'utils/helpers/Order.jsx';
import { convertToString } from 'utils/helpers/Time';
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
                Tạo ngày {convertToString(order.created_time, 'LocaleDateString')}
              </h3>
              <header className='order-item-secondary'>
                Tại {order.address}
              </header>

              <hr />

              <h3 className='order-item-date text-center'>
                {getStep(order.status).header}
              </h3>

              {order.status !== 'canceled' &&
                <>
                  {size > 1 ? 
                    <Row className='mt-4'>
                      {Array.from({ length : 7 }).map((_, idx) => (
                        <Col key={idx}>
                          {idx % 2 === 0 ?
                            <StepItem key={idx / 2} step={idx / 2} currentStep={order.status} />
                            :
                            <hr className='step-connector' />
                          }
                        </Col>
                      ))}
                    </Row>
                    :
                    <header className='order-item-secondary text-center mt-2'>
                      Hiện tại: {getStep(order.status).label} {`(${order.status}/4)`}
                    </header>
                  }
                </>
              }
              {order.status === 'init' || order.status === 'pending' &&
                <Row className='mt-4'>
                  <Col className='d-flex justify-content-end'>
                    <Button variant='outline-danger'>
                      Hủy Yêu cầu
                    </Button>
                  </Col>
                </Row>
              }

              <Row>
                {/* <Col className='ps-0'>
                  <Stack direction='horizontal' gap={4}>
                    <img className='order-info-donor-logo' src={order.donee.avatar} />
                    <Stack className='my-auto' direction='vertical' gap={1}>
                      <h5 className='fw-bold'>{order.donee.name}</h5>
                    </Stack>
                  </Stack>
                </Col> */}
                {/* <Col className='px-0' sm={2}>
                  <div className={size > 0 ? 'h-100 d-flex' : 'd-grid'}>
                    <Button
                      className={size > 0 ? 'my-auto me-0 ms-auto' : 'mt-4'}
                      variant='outline-secondary'
                    >
                      View Donee
                    </Button>
                  </div>
                </Col> */}

              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CartInfoCard;
