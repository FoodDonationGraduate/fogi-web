// Essentials
import React from 'react';
import { Button, Container, Col, Row, Stack } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';

// Components
import StepItem from 'components/common/StepItem';
import { updateRequest } from 'components/redux/reducer/RequestReducer';
import VolunteerInfo from 'components/common/request/VolunteerInfo';
import { cancelQuestionModal, setModalQuestion, showQuestionModal } from 'components/redux/reducer/ModalReducer';

// Assets
import { MdOutlineLocationOn, MdAccessTime } from 'react-icons/md';

// Utility
import { useResizer } from 'utils/helpers/Resizer.jsx';
import { getStatus, getStep, convertStepToNumber } from 'utils/helpers/Order.jsx';
import { convertToString } from 'utils/helpers/Time';

const OrderInfoCard = ({ order }) => {
  let size = useResizer();
  const userInfo = useSelector(state => state.authenticationReducer.user)
  const userToken = useSelector(state => state.authenticationReducer.token)
  const modalLogic = useSelector(state => state.modalReducer.logic)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cancelRequest = () => {
    dispatch(setModalQuestion('Bạn có muốn muốn hủy yêu cầu này không?'));
    dispatch(showQuestionModal());
  }

  const setArriving = () => {
    dispatch(updateRequest({request_id: order.id, request_status: 'shipping'}, { userInfo, userToken}, navigate));
  };

  const setSuccess = () => {
    dispatch(updateRequest({request_id: order.id, request_status: 'success'}, { userInfo, userToken}, navigate));
  };
  
  React.useEffect(() => {
    if (modalLogic) {
      dispatch(cancelQuestionModal());
      dispatch(updateRequest({request_id: order.id, request_status: 'canceled'}, {userInfo, userToken}, navigate));
    };
  })
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
                  <div className='fw-bold'>{`Địa chỉ ${order.delivery_type === 'pickup' ? ' nhận thực phẩm' : 'giao hàng'}`}</div>
                  <div>{order.address}</div>
                </Stack>
              </header>

              <h5 className='order-item-date mt-4'>
                Lí do đặt các Thực phẩm
              </h5>
              <header className='order-item-secondary'>
                {order.reason !== undefined ? order.reason : 'Không có lý do cụ thể.'}
              </header>

              <VolunteerInfo volunteerInfo={order.volunteer} orderId={order.id} />
              
              <hr />
              
              <h3 className='order-item-date text-center'>
                {getStep(order.status, true, order.delivery_type === 'delivery').header}
              </h3>

              {order.status !== 'canceled' && 
                <div>
                  {size > 1 ? 
                    <Row className='mt-4'>
                      {Array.from({ length : 7 }).map((_, idx) => (
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
                      Hiện tại: {getStep(order.status, true, order.delivery_type === 'delivery').label} {`(${convertStepToNumber(order.status) + 1}/4)`}
                    </header>
                  }
                </div>
              }
              {order.status === 'pending' &&
                <Row className='mt-4'>
                  <Col className='d-flex justify-content-end'>
                    <Stack direction='horizontal' gap={2}>
                      <Button variant='outline-danger' onClick={() => cancelRequest()}>
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
              {order.status === 'shipping' &&
                <Row className='mt-4'>
                  <Col className='d-flex justify-content-end'>
                    <Stack direction='horizontal' gap={2}>
                      <Button className='fogi' variant='primary' onClick={() => setSuccess()}>
                        Tôi đã nhận được Thực phẩm
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
