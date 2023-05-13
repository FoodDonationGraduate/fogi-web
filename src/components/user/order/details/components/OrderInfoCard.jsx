// Essentials
import React from 'react';
import { Button, Container, Col, Row, Stack } from 'react-bootstrap';

// Components
import StepItem from './StepItem';

// Utility
import { useResizer } from 'utils/helpers/Resizer.jsx';
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
                Tạo ngày {order.date}
              </h3>
              <header className='order-item-secondary'>
                Tại {order.address}
              </header>

              <h5 className='order-item-date mt-3'>
                Lí do đặt các Món ăn
              </h5>
              <header className='order-item-secondary'>
                Cung cấp thức ăn cho trẻ em nghèo miền núi.
              </header>
              
              <hr />
              
              <h3 className='order-item-date text-center'>
                {getStep(order.step).header}
              </h3>

              {size > 1 ? 
                <Row className='mt-4'>
                  {Array.from({ length : 7 }).map((_, idx) => (
                    <Col>
                      {idx % 2 === 0 ?
                        <StepItem key={idx / 2} step={idx / 2} currentStep={order.step} />
                        :
                        <hr className='step-connector' />
                      }
                    </Col>
                  ))}
                </Row>
                :
                <header className='order-item-secondary text-center mt-2'>
                  Hiện tại: {getStep(order.step).label} {`(${order.step}/4)`}
                </header>
              }

              <Row className='mt-4'>
                <Col className='d-flex justify-content-end'>
                  <Stack direction='horizontal' gap={2}>
                    <header className='order-item-secondary'>
                      Bạn có thể hủy Yêu cầu trong 20 giây
                    </header>
                    <Button variant='outline-danger'>
                      Hủy Yêu cầu
                    </Button>
                  </Stack>
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
