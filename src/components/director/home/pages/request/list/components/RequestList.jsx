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
import { retrieveAllRequests } from 'components/redux/reducer/DirectorReducer';

const RequestList = ({
  currentFrom,
  currentStatus,
  currentFilter,
  queryData=""
}) => {
  const allRequests = useSelector(state => state.directorReducer.allRequests);
  const userInfo = useSelector(state => state.authenticationReducer.user);
  const userToken = useSelector(state => state.authenticationReducer.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Pagination handling
  const REQUEST_COUNT = 4; // per page
  const [page, setPage] = useState(0); // a.k.a activeIdx
  const onChangePage = (idx) => {
    setPage(idx);
  };

  // Get all requests
  useEffect(() => {
    setPage(0);
  }, [currentFrom, currentStatus, currentFilter, queryData]);

  useEffect(() => { 
    var data = {
      limit: REQUEST_COUNT,
      offset: page * REQUEST_COUNT,
      request_from: currentFrom.slice(0,5) === 'donee' ? 'donee' : currentFrom,
      request_status: currentStatus,
      sort_field: currentFilter,
      sort_by: 'desc',
      search_query: queryData,
      delivery_type: currentFrom !== 'donor' ? currentFrom.slice(6) : ''
    };

    dispatch(retrieveAllRequests(
      data,
      { userInfo, userToken },
      navigate
    ));
    
    localStorage.setItem('requestAttributes', JSON.stringify({
      from: currentFrom,
      status: currentStatus,
      filter: currentFilter
    }));
  }, [page, currentFrom, currentStatus, currentFilter, queryData]);

  return (
    <div>
      {(Object.keys(allRequests).length !== 0 && allRequests.total !== 0) && 
        <Container>
          <Row>
            <Col className='px-0'>
              <Row className='mb-2' xs={1} md={2} lg={2} >
                {Object.keys(allRequests).length > 0 && 
                  <EqualHeight
                    animationSpeed={0.1}
                  >
                    {allRequests.requests.map((request, idx) => (
                      <Col className='mb-4' key={idx}>
                        <div
                          className='order-item'
                          onClick={() => navigate(`/${userInfo.user_type}/request/${currentFrom !== 'donor' ? 'donee' : currentFrom}/${request.id}`)}
                        >
                          <RequestCard
                            request={request}
                          />
                        </div>
                      </Col>
                    ))}
                  </EqualHeight>
                }
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
