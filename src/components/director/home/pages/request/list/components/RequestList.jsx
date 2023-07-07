// Essentials
import React, { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { EqualHeight } from 'react-equal-height';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

// Components
import RequestCard from 'components/common/request/RequestCard';
import Pagination from 'components/common/pagination/Pagination';
import CommonNotFoundBody from 'components/common/CommonNotFoundBody';

// Reducers
import { retrieveAllRequests, setCurrentRequest } from 'components/redux/reducer/DirectorReducer';

const RequestList = ({
  currentType,
  currentStatus
}) => {
  const allRequests = useSelector(state => state.directorReducer.allRequests);
  const userInfo = useSelector(state => state.authenticationReducer.user);
  const userToken = useSelector(state => state.authenticationReducer.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Pagination handling
  const REQUEST_COUNT = 4; // per page
  const [page, setPage] = useState(0); // a.k.a activeIdx
  const onChangePage = async (idx) => {
    setPage(idx);
    await dispatch(retrieveAllRequests(
      {
        limit: REQUEST_COUNT,
        offset: idx * REQUEST_COUNT,
        request_from: currentType,
        request_status: currentStatus
      },
      { userInfo, userToken },
      navigate
    ));
  };

  // Get Available Volunteers
  useEffect(() => {
    setPage(0);
    dispatch(retrieveAllRequests(
      {
        limit: REQUEST_COUNT,
        offset: 0,
        request_from: currentType,
        request_status: currentStatus
      },
      { userInfo, userToken },
      navigate
    ));
  }, [currentType, currentStatus]);

  return (
    <div>
      {(Object.keys(allRequests).length !== 0 && allRequests.total !== 0) && 
        <Container>
          <Row>
            <Col className='px-0'>
              <Row className='mb-2' xs={1} md={2} lg={2} >
                <EqualHeight>
                  {Object.keys(allRequests).length !== 0 && allRequests.requests.map((request, idx) => (
                    <Col className='mb-4' key={idx}>
                      <div
                        className='order-item'
                        onClick={() => dispatch(setCurrentRequest(request))}
                      >
                        <RequestCard
                          request={request}
                        />
                      </div>
                    </Col>
                  ))}
                </EqualHeight>
              </Row>
              <div className='d-flex justify-content-center'>
                <Pagination
                  pageCount={Math.ceil(allRequests.total / REQUEST_COUNT)}
                  activeIdx={page}
                  onChangePage={onChangePage}
                />
              </div>
            </Col>
          </Row>
        </Container>
      }
      {(Object.keys(allRequests).length === 0 || allRequests.total === 0) && 
        <CommonNotFoundBody title='Chưa có Yêu cầu nào'/>
      }
    </div>
  );
};

export default RequestList;
