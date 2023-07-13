// Essentials
import React, { useState } from 'react';
import { Button, Container, Col, Row, Stack } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';

// Components
import StepItem from 'components/common/request/StepItem';
import { updateRequest } from 'components/redux/reducer/RequestReducer';
import VolunteerInfo from 'components/common/request/VolunteerInfo';
import CancelModal from 'components/common/request/CancelModal';

// Assets
import { MdAccessTime, MdOutlineLocationOn } from 'react-icons/md';

// Utility
import { useResizer } from 'utils/helpers/Resizer.jsx';
import { getState } from 'utils/helpers/Request.jsx';
import { convertToString } from 'utils/helpers/Time';
import { reduceString } from 'utils/helpers/String';

const RequestInfoCard = ({ request }) => {
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
    dispatch(updateRequest({request_id: request.id, request_status: 'receiving'}, { userInfo, userToken}, navigate));
  };

  // handle pickup map
  const [isHovering, setIsHovering] = useState(false);
  const handleClick = (address) => {
    let newAdress = address.replaceAll(' ', '+')
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${newAdress}`, '_blank', 'noopener,noreferrer');
  }

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

              <div className='mt-3 mb-1'>
                <h4 className='order-item-date'>
                  Yêu cầu {request.id}
                </h4>
              </div>
              
              <div className='mt-2'> 
                <header className='order-item-secondary'>
                  <MdAccessTime /> Khởi tạo: {convertToString(request.created_time, 'LocaleString')}
                </header>
                <header className='order-item-secondary'>
                  <MdAccessTime /> Cập nhật: {convertToString(request.last_updated_state_time, 'LocaleString')}
                </header>
                <header className='order-item-secondary'>
                  <MdAccessTime /> Thời gian giao: {convertToString(request.ready_time, 'LocaleDateString')} 
                  {convertToString(request.start_time, 'LocaleTimeString')} - {convertToString(request.end_time, 'LocaleTimeString')} 
                </header>
              </div>

              <Stack className='mb-2 mt-3' direction='horizontal' gap={2}>
                <h5 className='order-item-date'>
                  Hình thức nhận thực phẩm
                </h5>
                <div className='order-tag'>{request.delivery_type === 'pickup' ? 'Lấy tại chỗ' : 'Giao hàng'}</div>
              </Stack>
              <header className='order-item-secondary'>
                <Stack direction='horizontal' gap={2}>
                  <div className='fw-bold'>{`Địa chỉ ${request.delivery_type === 'pickup' ? ' nhận thực phẩm' : 'giao hàng'}:`}</div>
                  {
                    request.delivery_type === 'pickup' 
                      ? <div 
                          style={{boxShadow: isHovering ? '0 0 8px #82CD47' : ''}} 
                          onClick={() => handleClick(request.address)}
                          onMouseEnter={() => setIsHovering(true)}
                          onMouseLeave={() => setIsHovering(false)}
                          >
                            2 - 4 Đ. Hồng Hà, Phường 2, Tân Bình, Thành phố Hồ Chí Minh
                          </div>
                      : <div>{request.address}</div> 
                  }
                </Stack>
              </header>

              <h5 className='order-item-date mt-4'>
                Lí do đặt Thực phẩm
              </h5>
              <header className='order-item-secondary'>
                {request.reason !== undefined ? request.reason : 'Không có lý do cụ thể.'}
              </header>

              <VolunteerInfo volunteerInfo={request.volunteer} order={request} />
              
              <hr />

              <h5 className='order-item-date text-center'>
                {getState({ request }).content.text}
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
                      Hiện tại: {getState({ request }).content.not_pass}
                    </header>
                  }
                </>
              }

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

              {request.status === 'pending' &&
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
              {request.status === 'accepted' && request.delivery_type === 'pickup' &&
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

export default RequestInfoCard;
