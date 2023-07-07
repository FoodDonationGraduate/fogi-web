// Essentials
import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';

// Assets
import { MdOutlineLocationOn, MdAccessTime } from 'react-icons/md';

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
                      <MdAccessTime /> {convertToString(request.created_time, 'LocaleDateString')}
                    </header>
                    <header className='order-item-secondary'>
                      <MdOutlineLocationOn /> {reduceString(request.address, 80)}
                    </header>
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
                {getStep(request.status, false, true).header}
              </h3>

              {request.status !== 'canceled' &&
                <>
                  {size > 2 ? 
                    <Row className='mt-4'>
                      {Array.from({ length : 9 }).map((_, idx) => (
                        <Col key={idx}>
                          {idx % 2 === 0 ?
                            <StepItem
                              key={idx / 2}
                              step={idx / 2}
                              currentStep={request.status}
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
                      Hiện tại: {getStep(request.status, false, true).label} {`(${convertStepToNumber(request.status) + 1}/5)`}
                    </header>
                  }
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
