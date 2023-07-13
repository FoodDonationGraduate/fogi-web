// Essentials
import React, { useState } from 'react';
import { Container, Col, Row, Stack } from 'react-bootstrap';

// Assets
import { MdOutlineLocationOn, MdAccessTime, MdTimelapse } from 'react-icons/md';

// Components
import UserItem from 'components/common/request/UserItem';
import StepItem from 'components/common/StepItem';

// Utility
import { useResizer } from 'utils/helpers/Resizer.jsx';
import { getStatus, getStep, convertStepToNumber } from 'utils/helpers/Order.jsx';
import { convertToString } from 'utils/helpers/Time';
import { reduceString } from 'utils/helpers/String';

const RequestInfoCard = ({ request }) => {
  let size = useResizer();

  // handle pickup map
  const [isHovering, setIsHovering] = useState(false);
  const handleClick = (address) => {
    let newAdress = address.replaceAll(' ', '+')
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${newAdress}`, '_blank', 'noopener,noreferrer');
  }

  return (
    <>
      <Container>
        <Row>
          <Col>
            <div className='order-info-card'>
              <div className={size > 2 ? 'd-flex justify-content-between' : ''}>
                <div>
                  <span
                    className={`order-item-status order-item-status-${getStatus(request).css}`}
                  >
                    {getStatus(request).label}
                  </span>

                  <h3 className='order-item-date mt-3'>
                    Yêu cầu {request.user.user_type === 'donor' ? 'Cho' : 'Nhận'} {request.id}
                  </h3>

                  <div className='mt-2'> 
                    <header className='order-item-secondary'>
                      <MdAccessTime /> Khởi tạo: {convertToString(request.created_time, 'LocaleString')}
                    </header>
                    <header className='order-item-secondary'>
                      <MdAccessTime /> Cập nhật: {convertToString(request.last_updated_state_time, 'LocaleString')}
                    </header>
                    <header className='order-item-secondary'>
                      <MdOutlineLocationOn />{' '}
                      {
                        request.address.length > 0 ? reduceString(request.address, 80)
                        : '2 - 4 Đ. Hồng Hà, Phường 2, Tân Bình, Thành phố Hồ Chí Minh'
                      }
                    </header>

                    {request.delivery_type &&
                      <>
                        <Stack className='mt-3' direction='horizontal' gap={2}>
                          <h5 className='order-item-date'>
                            Hình thức nhận thực phẩm
                          </h5>
                          <div className='order-tag'>{request.delivery_type === 'pickup' ? 'Lấy tại chỗ' : 'Giao hàng'}</div>
                        </Stack>
                      </>
                    }
                    {request.reason &&
                      <>
                        <h5 className='order-item-date mt-4'>
                          Lí do đặt Thực phẩm
                        </h5>
                        <header className='order-item-secondary'>
                          {request.reason.length > 0 ? request.reason : 'Không có lý do cụ thể.'}
                        </header>
                      </>
                    }
                  </div>
                </div>
                {size <= 2 && <hr />}
                <div>
                  {request.volunteer &&
                    <>
                      <UserItem user={request.volunteer} />
                      <div className='my-3' />
                    </>
                  }
                  {request.user && <UserItem user={request.user} user_type={request.user.user_type} />}
                </div>
              </div>

              <hr />

              <h3 className='order-item-date text-center'>
                {getStep(request.status, false, request.delivery_type === 'delivery', request).header}
              </h3>

              {request.status !== 'canceled' &&
                <>
                  {size > 2 ? 
                    <Row className='mt-4'>
                      {Array.from({ length : request.delivery_type === 'pickup' ? 7 : 9}).map((_, idx) => (
                        <Col key={idx}>
                          {idx % 2 === 0 ?
                            <StepItem
                              key={idx / 2}
                              step={idx / 2}
                              currentStep={request.status}
                              isDonee={request.user.user_type ==='donee'}
                              isDelivery={request.delivery_type === 'delivery'}
                            />
                            :
                            <hr className='step-connector' />
                          }
                        </Col>
                      ))}
                    </Row>
                    :
                    <header className='order-item-secondary text-center mt-2'>
                      Hiện tại: {getStep(request.status, false, true, request).label} {`(${convertStepToNumber(request.status) + 1}/5)`}
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
                    {request.cancel_reason ? request.cancel_reason : 'Không có lý do cụ thể.'}
                  </header>
                </div>
              }
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RequestInfoCard;
