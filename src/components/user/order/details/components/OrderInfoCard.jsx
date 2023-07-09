// Essentials
import React, { useState } from 'react';
import { Button, Container, Col, Row, Stack } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';

// Components
import StepItem from 'components/common/StepItem';
import { updateRequest } from 'components/redux/reducer/RequestReducer';
import VolunteerInfo from 'components/common/request/VolunteerInfo';
import CancelModal from 'components/common/request/CancelModal';

// Assets
import { MdAccessTime } from 'react-icons/md';

// Utility
import { useResizer } from 'utils/helpers/Resizer.jsx';
import { getStatus, getStep, convertStepToNumber } from 'utils/helpers/Order.jsx';
import { convertToString } from 'utils/helpers/Time';

const OrderInfoCard = ({ order }) => {
  let size = useResizer();
  const userInfo = useSelector(state => state.authenticationReducer.user);
  const userToken = useSelector(state => state.authenticationReducer.token);

  // Cancel Modal
  const [show, setShow] = useState(false);
  const onShow = () => setShow(true);
  const onClose = () => setShow(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const setArriving = () => {
    dispatch(updateRequest({request_id: order.id, request_status: 'shipping'}, { userInfo, userToken}, navigate));
  };

  // handle pickup map
  const [isHovering, setIsHovering] = useState(false);
  const handleClick = (address) => {
    let newAdress = address.replaceAll(' ', '+')
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${newAdress}`, '_blank', 'noopener,noreferrer');
  }

  return (
    <>
      <CancelModal show={show} onClose={onClose} request={order} />
      <Container>
        <Row>
          <Col>
            <div className='order-info-card'>
              <span
                className={`order-item-status order-item-status-${getStatus(order).css}`}
              >
                {getStatus(order).label}
              </span>

              <div className='mt-3 mb-1'>
                <h4 className='order-item-date'>
                  Yêu cầu {order.id}
                </h4>
              </div>
              <header className='order-item-secondary mt-2'>
                <MdAccessTime /> {convertToString(order.created_time, 'LocaleDateString')}
              </header>

              <Stack className='mb-2 mt-3' direction='horizontal' gap={2}>
                <h5 className='order-item-date'>
                  Hình thức nhận thực phẩm
                </h5>
                <div className='order-tag'>{order.delivery_type === 'pickup' ? 'Lấy tại chỗ' : 'Giao hàng'}</div>
              </Stack>
              <header className='order-item-secondary'>
                <Stack direction='horizontal' gap={2}>
                  <div className='fw-bold'>{`Địa chỉ ${order.delivery_type === 'pickup' ? ' nhận thực phẩm' : 'giao hàng'}:`}</div>
                  {
                    order.delivery_type === 'pickup' 
                      ? <div 
                          style={{boxShadow: isHovering ? '0 0 8px #82CD47' : ''}} 
                          onClick={() => handleClick(order.address)}
                          onMouseEnter={() => setIsHovering(true)}
                          onMouseLeave={() => setIsHovering(false)}
                          >{order.address}
                          </div>
                      : <div>{order.address}</div> 
                  }
                </Stack>
              </header>

              <h5 className='order-item-date mt-4'>
                Lí do đặt các Thực phẩm
              </h5>
              <header className='order-item-secondary'>
                {order.reason !== undefined ? order.reason : 'Không có lý do cụ thể.'}
              </header>

              <VolunteerInfo volunteerInfo={order.volunteer} order={order} />
              
              <hr />
              
              <h3 className='order-item-date text-center'>
                {getStep(order.status, true, order.delivery_type === 'delivery', order).header}
              </h3>

              {order.status === 'canceled' && 
                <div>
                  <h5 className='order-item-date mt-4'>
                    Lí do bị hủy
                  </h5>
                  <header className='order-item-secondary'>
                    {order.cancel_reason !== undefined ? order.cancel_reason : 'Không có lý do cụ thể.'}
                  </header>
                </div>
              }

              {order.status !== 'canceled' && 
                <div>
                  {size > 1 ? 
                    <Row className='mt-4'>
                      {Array.from({ length : order.delivery_type === 'delivery' ? 9 : 7 }).map((_, idx) => (
                        <Col key={idx}>
                          {idx % 2 === 0 ?
                            <StepItem
                              key={idx / 2}
                              step={idx / 2}
                              currentStep={order.status}
                              isDonee={true}
                              isDelivery={order.delivery_type === 'delivery'}
                            />
                            :
                            <hr className='step-connector' />
                          }
                        </Col>
                      ))}
                    </Row>
                    :
                    <header className='order-item-secondary text-center mt-2'>
                      Hiện tại: {getStep(order.status, true, order.delivery_type === 'delivery').label} {`(${convertStepToNumber(order.status) + 1}/5)`}
                    </header>
                  }
                </div>
              }
              {order.status === 'pending' &&
                <Row className='mt-4'>
                  <Col className='d-flex justify-content-end'>
                    <Stack direction='horizontal' gap={2}>
                      <Button variant='outline-danger' onClick={onShow}>
                        Hủy Yêu cầu
                      </Button>
                    </Stack>
                  </Col>
                </Row>
              }
              {order.status === 'accepted' && order.delivery_type === 'pickup' &&
                <Row className='mt-4'>
                  <Col className='d-flex justify-content-end'>
                    <Stack direction='horizontal' gap={2}>
                      <Button className='fogi' variant='primary' onClick={() => setArriving()}>
                        Bắt đầu đến nhận
                      </Button>
                    </Stack>
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

export default OrderInfoCard;
