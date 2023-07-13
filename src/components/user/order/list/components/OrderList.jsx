// Essentials
import React, { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { EqualHeight } from 'react-equal-height';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';

// Components
import RequestCard from 'components/common/request/RequestCard';
import Pagination from 'components/common/pagination/Pagination';
import { retrieveAllRequests } from 'components/redux/reducer/RequestReducer';
import CommonNotFoundBody from 'components/common/CommonNotFoundBody';

const OrderList = ({
  currentDeliveryType,
  currentStatus,
  currentFilter,
  queryData=""
}) => {
  const allRequests = useSelector(state => state.requestReducer.allRequests)
  const userInfo = useSelector(state => state.authenticationReducer.user)
  const userToken = useSelector(state => state.authenticationReducer.token)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ORDER_COUNT = 6; // per page
  const [page, setPage] = useState(0); // a.k.a activeIdx

  const onChangePage = async (idx) => {
    setPage(idx);
  };

  // Get all requests
  useEffect(() => {
    setPage(0);
  }, [currentDeliveryType, currentStatus, currentFilter, queryData]);

  useEffect(()=>{
    var data = {
      limit: ORDER_COUNT,
      offset: page * ORDER_COUNT,
      request_status: currentStatus,
      sort_field: currentFilter,
      sort_by: 'desc',
      search_query: queryData,
      delivery_type: currentDeliveryType
    };

    dispatch(retrieveAllRequests(data, {userInfo, userToken}, navigate))
    localStorage.setItem('requestAttributes', JSON.stringify({
      delivery_type: currentDeliveryType,
      status: currentStatus,
      filter: currentFilter
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, currentDeliveryType, currentStatus, currentFilter, queryData]);

  return (
    <div>
      {(Object.keys(allRequests).length !== 0 && allRequests.total_requests !== 0) && 
      <Container>
        <Row>
          <Col className='px-0'>
            <Row className='mb-4' xs={1} md={2} lg={3}>
              <EqualHeight>
                {allRequests.requests.map((request) => (
                  <Col className='mb-4' key={request.id}>
                    <div className='order-item' onClick={() => navigate(`/request/${request.id}`)}>
                      <RequestCard request={request} />
                    </div>
                  </Col>
                ))}
              </EqualHeight>
            </Row>
            <div className='d-flex justify-content-center'>
                <Pagination
                  pageCount={Math.ceil(allRequests.total_requests / ORDER_COUNT)}
                  activeIdx={page}
                  onChangePage={onChangePage}
                />
            </div>
          </Col>
        </Row>
      </Container>
      }
      {(Object.keys(allRequests).length === 0 || allRequests.total_requests === 0) && 
        <CommonNotFoundBody title='Không tìm thấy yêu cầu nào'/>
      }
    </div>
    
  );
};

export default OrderList;
