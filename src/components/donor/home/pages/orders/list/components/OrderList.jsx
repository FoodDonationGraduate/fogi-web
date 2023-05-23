// Essentials
import * as React from 'react';
import { useState } from 'react';
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
  currentStatus
}) => {
  const allRequests = useSelector(state => state.requestReducer.allRequests)
  const sort = useSelector(state => state.requestReducer.sort)
  const userInfo = useSelector(state => state.authenticationReducer.user)
  const userToken = useSelector(state => state.authenticationReducer.token)
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ORDER_COUNT = 6; // per page
  const [page, setPage] = useState(0); // a.k.a activeIdx

  const onChangePage = async (idx) => {
    setPage(idx);
    await dispatch(retrieveAllRequests({limit: ORDER_COUNT, offset: idx * ORDER_COUNT, sort_field: sort, request_status: currentStatus}, {userInfo, userToken}, navigate))
  };

  React.useEffect(()=>{
    dispatch(retrieveAllRequests({limit: ORDER_COUNT, offset: page * ORDER_COUNT, sort_field: sort, request_status: currentStatus}, {userInfo, userToken}, navigate))
  }, [sort, currentStatus]);


  return (
    <div>
      {(Object.keys(allRequests).length !== 0 && allRequests.total_requests !== 0) && 
        <Container>
          <Row>
            <Col className='px-0'>
              <Row className='mb-4' xs={1} md={2} lg={3}>
                <EqualHeight>
                  {Object.keys(allRequests).length !== 0 && allRequests.requests.map((request) => (
                    <Col className='mb-4' key={request.id}>
                      <RequestCard order={request} />
                    </Col>
                  ))}
                </EqualHeight>
              </Row>
              <div className='d-flex justify-content-center'>
                {Object.keys(allRequests).length !== 0 && 
                  <Pagination
                    pageCount={Math.ceil(allRequests.total_requests / ORDER_COUNT)}
                    activeIdx={page}
                    onChangePage={onChangePage}
                  />
                }
              </div>
            </Col>
          </Row>
        </Container>
      }
      {(Object.keys(allRequests).length === 0 || allRequests.total_requests === 0) && 
        <CommonNotFoundBody title='Bạn chưa tạo yêu cầu nào'/>
      }
    </div>
  );
};

export default OrderList;
