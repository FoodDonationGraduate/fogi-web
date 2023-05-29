// Essentials
import React from 'react';
import { Button, Container, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';

// Assets
import { MdOutlineLocationOn, MdAccessTime } from 'react-icons/md';

// Components
import StepItem from 'components/common/StepItem';
import { updateRequest } from 'components/redux/reducer/RequestReducer';
import VolunteerInfo from 'components/common/request/VolunteerInfo';
import { cancelQuestionModal, setModalQuestion, showQuestionModal } from 'components/redux/reducer/ModalReducer';

// Utility
import { useResizer } from 'utils/helpers/Resizer.jsx';
import { getStatus, getStep, convertStepToNumber } from 'utils/helpers/Order.jsx';
import { convertToString } from 'utils/helpers/Time';
import { reduceString } from 'utils/helpers/String';

const CartInfoCard = ({ order }) => {
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
                      <Button variant='outline-danger' onClick={() => cancelRequest()}>
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
