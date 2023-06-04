// Essentials
import React, { useState } from 'react';
import { Button, Container, Col, Row } from 'react-bootstrap';

// Assets
import { MdOutlineLocationOn, MdAccessTime } from 'react-icons/md';

// Components
import StepItem from 'components/common/StepItem';
import VolunteerInfo from 'components/common/request/VolunteerInfo';
import CancelModal from 'components/common/request/CancelModal';

// Utility
import { useResizer } from 'utils/helpers/Resizer.jsx';
import { getStatus, getStep, convertStepToNumber } from 'utils/helpers/Order.jsx';
import { convertToString } from 'utils/helpers/Time';
import { reduceString } from 'utils/helpers/String';

const CartInfoCard = ({ order }) => {
  let size = useResizer();

  // Cancel Modal
  const [show, setShow] = useState(false);
  const onShow = () => setShow(true);
  const onClose = () => setShow(false);

  return (
    <>
      <CancelModal show={show} onClose={onClose} volunteerInfo={order.volunteer} orderId={order.id} />
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
                Yêu cầu {order.id}
              </h3>

              <div className='mt-2'> 
                <header className='order-item-secondary'>
                  <MdAccessTime /> {convertToString(order.created_time, 'LocaleDateString')}
                </header>
                <header className='order-item-secondary'>
                  <MdOutlineLocationOn /> {reduceString(order.address, 80)}
                </header>
              </div>

              <VolunteerInfo volunteerInfo={order.volunteer} orderId={order.id} />

              <hr />

              <h3 className='order-item-date text-center'>
                {getStep(order.status, false, true).header}
              </h3>

              {order.status !== 'canceled' &&
                <>
                  {size > 1 ? 
                    <Row className='mt-4'>
                      {Array.from({ length : 7 }).map((_, idx) => (
                        <Col key={idx}>
                          {idx % 2 === 0 ?
                            <StepItem
                              key={idx / 2}
                              step={idx / 2}
                              currentStep={order.status}
                              isDonee={false}
                            />
                            :
                            <hr className='step-connector' />
                          }
                        </Col>
                      ))}
                    </Row>
                    :
                    <header className='order-item-secondary text-center mt-2'>
                      Hiện tại: {getStep(order.status, false, true).label} {`(${convertStepToNumber(order.status) + 1}/4)`}
                    </header>
                  }
                </>
              }
              {(order.status === 'init' || order.status === 'pending' || order.status === 'canceled') &&
                <Row className='mt-4'>
                  <Col className='d-flex justify-content-end'>
                    {(order.status === 'init' || order.status === 'pending') && (
                      <Button variant='outline-danger' onClick={onShow}>
                        Hủy Yêu cầu
                      </Button>
                    )}
                    {order.status === 'canceled' && (
                      <Button variant='primary' className='fogi'>
                        Tạo lại Yêu cầu
                      </Button>
                    )}
                  </Col>
                </Row>
              }
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CartInfoCard;
