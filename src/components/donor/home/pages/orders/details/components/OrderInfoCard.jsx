// Essentials
import React, { useState } from 'react';
import { Button, Container, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";

// Assets
import { MdOutlineLocationOn, MdAccessTime } from 'react-icons/md';

// Components
import StepItem from 'components/common/StepItem';
import VolunteerInfo from 'components/common/request/VolunteerInfo';
import CancelModal from 'components/common/request/CancelModal';
import { setModalMessage, showModal ,cancelQuestionModal, setModalQuestion, showQuestionModal } from 'components/redux/reducer/ModalReducer';
import { remakeDonorBag } from 'components/redux/reducer/RequestReducer';

// Utility
import { useResizer } from 'utils/helpers/Resizer.jsx';
import { getStatus, getStep, convertStepToNumber } from 'utils/helpers/Order.jsx';
import { convertToString } from 'utils/helpers/Time';
import { reduceString } from 'utils/helpers/String';
import { distanceTime } from 'utils/helpers/Time';

const OrderInfoCard = ({ order }) => {
  let size = useResizer();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalLogic = useSelector(state => state.modalReducer.logic);
  const userInfo = useSelector(state => state.authenticationReducer.user)
  const userToken = useSelector(state => state.authenticationReducer.token)
  const [id, setId] = React.useState({})

  // Cancel Modal
  const [show, setShow] = useState(false);
  const onShow = () => setShow(true);
  const onClose = () => setShow(false);

  // Re-create request
  const recreateRequest = (products, request_id) => {
    console.log(products.every((product) => {return distanceTime(product.expired_time) !== 'Đã hết hạn'}))
    if (!products.every((product) => {return distanceTime(product.expired_time) !== 'Đã hết hạn'})) {
      dispatch(setModalMessage('Một trong những sản phẩm của yêu cầu đã hết hạn!'))
      dispatch(showModal())
    } else {
      dispatch(setModalQuestion("Bạn có muốn phục hồi những sản phẩm này không?"))
      dispatch(showQuestionModal())
      setId(request_id)
    }
  }

  React.useEffect(() => {
      if (modalLogic) {
          dispatch(cancelQuestionModal())
          dispatch(remakeDonorBag({request_id: id}, {userInfo, userToken},navigate))
      }
  })

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

              <VolunteerInfo volunteerInfo={order.volunteer} order={order} />

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
                      Hiện tại: {getStep(order.status, false, true).label} {`(${convertStepToNumber(order.status) + 1}/5)`}
                    </header>
                  }
                </>
              }
              {(order.status === 'init' || order.status === 'pending' || order.status === 'canceled') &&
                <>
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
                  <Row className='mt-4'>
                    <Col className='d-flex justify-content-end'>
                      {(order.status === 'init' || order.status === 'pending') && (
                        <Button variant='outline-danger' onClick={onShow}>
                          Hủy Yêu cầu
                        </Button>
                      )}
                      {order.status === 'canceled' && (
                        <>
                          {!order.is_request_remade ?
                            <Button variant='primary' className='fogi' onClick={() => recreateRequest(order.products, order.id)}> 
                              Tạo lại Túi Quyên góp
                            </Button>
                            :
                            <Button variant='primary' className='fogi' disabled> 
                              Đã tạo lại Túi Quyên góp
                            </Button>
                          }
                        </>
                      )}
                    </Col>
                  </Row>
                </>
              }
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default OrderInfoCard;
