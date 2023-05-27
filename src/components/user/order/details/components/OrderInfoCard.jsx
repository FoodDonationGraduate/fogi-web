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

// Utility
import { useResizer } from 'utils/helpers/Resizer.jsx';
import { getStatus, getStep, convertStepToNumber } from 'utils/helpers/Order.jsx';
import { convertToString } from 'utils/helpers/Time';

const CartInfoCard = ({ order }) => {
  let size = useResizer();
  const userInfo = useSelector(state => state.authenticationReducer.user)
  const userToken = useSelector(state => state.authenticationReducer.token)
  const modalLogic = useSelector(state => state.modalReducer.logic)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cancelRequest = () => {
    dispatch(setModalQuestion('Do you want to cancel this request?'));
    dispatch(showQuestionModal());
  }
  
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
              <h3 className='order-item-date mt-3'>
                Tạo ngày {convertToString(order.created_time, 'LocaleDateString')}
              </h3>
              <header className='order-item-secondary'>
                Tại {order.address}
              </header>

              <h5 className='order-item-date mt-3'>
                Lí do đặt các Món ăn
              </h5>
              <header className='order-item-secondary'>
                {order.reason !== undefined ? order.reason : 'Không có lý do cụ thể.'}
              </header>

              <VolunteerInfo volunteerInfo={order.volunteer} />
              
              <hr />
              
              <h3 className='order-item-date text-center'>
                {getStep(order.status, true, true).header}
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
                              isDelivery={true}
                            />
                            :
                            <hr className='step-connector' />
                          }
                        </Col>
                      ))}
                    </Row>
                    :
                    <header className='order-item-secondary text-center mt-2'>
                      Hiện tại: {getStep(order.status, true, true).label} {`(${convertStepToNumber(order.status) + 1}/4)`}
                    </header>
                  }
                </div>
              }
              {order.status === 'init' || order.status === 'pending' &&
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

            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CartInfoCard;
