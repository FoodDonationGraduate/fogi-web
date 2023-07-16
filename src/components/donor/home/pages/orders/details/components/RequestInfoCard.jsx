// Essentials
import React, { useState } from 'react';
import { Button, Container, Col, Row, Stack } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";

// Assets
import { MdOutlineLocationOn, MdAccessTime, MdUpdate, MdLocalShipping } from 'react-icons/md';

// Components
import StepItem from 'components/common/request/StepItem';
import VolunteerInfo from 'components/common/request/VolunteerInfo';
import CancelModal from 'components/common/request/CancelModal';
import { setModalMessage, showModal ,cancelQuestionModal, setModalQuestion, showQuestionModal } from 'components/redux/reducer/ModalReducer';
import { remakeDonorBag } from 'components/redux/reducer/RequestReducer';

// Utility
import { useResizer } from 'utils/helpers/Resizer.jsx';
import { getState } from 'utils/helpers/Request.jsx';
import { convertToString } from 'utils/helpers/Time';
import { reduceString } from 'utils/helpers/String';
import { distanceTime } from 'utils/helpers/Time';

const RequestInfoCard = ({ request }) => {
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
      dispatch(setModalMessage('Một trong những thực phẩm của yêu cầu đã hết hạn!'))
      dispatch(showModal())
    } else {
      dispatch(setModalQuestion("Bạn có muốn phục hồi những thực phẩm này không?"))
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

  const { content, color } = getState({ request });

  return (
    <>
      <CancelModal show={show} onClose={onClose} request={request} />
      <Container>
        <Row>
          <Col>
            <div className='order-info-card'>
              <span
                className={`order-item-status order-item-status-${color}`}
              >
                {content.chip}
              </span>

              <h3 className='order-item-date mt-3'>
                Yêu cầu {request.id}
              </h3>

              <div className='mt-2'>
                <Stack direction={size > 2 ? 'horizontal' : 'veritical'} gap={3}>
                  <header className='order-item-secondary'>
                    <MdAccessTime /> Khởi tạo: {convertToString(request.created_time, 'LocaleString')}
                  </header>
                  <header className='order-item-secondary'>
                    <MdUpdate /> Cập nhật: {convertToString(request.last_updated_state_time, 'LocaleString')}
                  </header>
                </Stack>
                <header className='order-item-secondary'>
                  <MdLocalShipping /> Thời gian giao: {convertToString(request.available_start_date, 'LocaleDateString')}, {request.available_start_time.slice(0,5)} 
                  {' '}- {convertToString(request.available_end_date, 'LocaleDateString')}, {request.available_end_time.slice(0,5)} 
                </header>
                <header className='order-item-secondary'>
                  <MdOutlineLocationOn /> {reduceString(request.address, 80)}
                </header>
              </div>

              <VolunteerInfo volunteerInfo={request.volunteer} order={request} />

              <hr />

              <h5 className='order-item-date text-center'>
                {content.text}
              </h5>

              {request.status !== 'canceled' &&
                <>
                  {size > 2 ? 
                    <div className='mt-4'>
                      {Array.from({ length : 11 }).map((_, idx) => 
                      ((request.delivery_type === 'pickup' && ![3, 4, 7, 8].includes(idx)) ||
                      (request.delivery_type !== 'pickup' && ![1, 2].includes(idx))) && (
                        <div key={idx}>
                          {idx % 2 === 0 ?
                            <StepItem
                              request={request}
                              step={idx / 2}
                            />
                            :
                            <div
                              className={`step-connector pass`}
                            />
                          }
                        </div>
                      ))}
                    </div>
                    :
                    <header className='order-item-secondary text-center mt-2'>
                      Hiện tại: {content.not_pass}
                    </header>
                  }
                </>
              }
              
              {(request.status === 'pending' || request.status === 'canceled') &&
                <>
                  {request.status === 'canceled' &&
                    <div>
                      <h5 className='order-item-date mt-4'>
                        Lí do bị hủy
                      </h5>
                      <header className='order-item-secondary'>
                        {request.cancel_reason !== undefined ? request.cancel_reason : 'Không có lý do cụ thể.'}
                      </header>
                    </div>
                  }
                  <Row className='mt-4'>
                    <Col className='d-flex justify-content-end'>
                      {(request.status === 'pending') && (
                        <Button variant='outline-danger' onClick={onShow}>
                          Hủy Yêu cầu
                        </Button>
                      )}
                      {request.status === 'canceled' && (
                        <>
                          {!request.is_request_remade ?
                            <Button variant='primary' className='fogi' onClick={() => recreateRequest(request.products, request.id)}> 
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

export default RequestInfoCard;
