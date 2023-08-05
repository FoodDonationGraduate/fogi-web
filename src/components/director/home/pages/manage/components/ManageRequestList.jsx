// Essentials
import * as React from 'react';
import { useState, useEffect } from 'react';
import {  Col, Row } from 'react-bootstrap';
import { EqualHeight, EqualHeightElement } from 'react-equal-height';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { retrieveAllRequests } from 'components/redux/reducer/DirectorReducer';

// Components
import Pagination from 'components/common/pagination/Pagination';
import RequestCard from 'components/common/request/RequestCard';
import ChipList from 'components/common/chip/ChipList';

const ManageRequestList = ({ user }) => {
  const allRequests = useSelector(state => state.directorReducer.allRequests);
  const directorInfo = useSelector(state => state.authenticationReducer.user);
  const directorToken = useSelector(state => state.authenticationReducer.token);

  const REQUESTS_COUNT = 4; // per page
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Chip List - Request type
  const typeList = ['donor', 'donee'];
  const getTypeLabel = (status) => {
    switch (status) {
      case 'donee': return 'Nhận';
      default: return 'Cho';
    }
  };
  const typeStyleList = ['success', 'success'];
  const [activeFromIdx, setActiveFromIdx] = useState(0);

  const onChangePage = async (idx) => {
    setPage(idx);
  };
  
  useEffect(() => {
    let data = {
      limit: REQUESTS_COUNT,
      offset: page * REQUESTS_COUNT,
      sort_field: 'last_updated_state_time',
      sort_by: 'desc',
      request_status: '',
      request_from: user.user_type !== 'volunteer' ? user.user_type : typeList[activeFromIdx],
      user_email: user.email,
      volunteer_email: user.email
    };
    if (user.user_type !== 'volunteer') {delete data.volunteer_email;} else {delete data.user_email;}
    dispatch(retrieveAllRequests(
      data, {
        userInfo: directorInfo,
        userToken: directorToken
      },
      navigate
    ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, activeFromIdx]);

  return (
    <>
        {user.user_type === 'volunteer' &&
          <ChipList
              activeStatusIdx={activeFromIdx}
              setActiveStatusIdx={setActiveFromIdx}
              statusList={typeList}
              getStatusLabel={getTypeLabel}
              styleList={typeStyleList}
              title={'Loại yêu cầu'}
              currrentStyle={'mb-2'}
          />
        }
        {(Object.keys(allRequests).length !== 0 && allRequests.total !== 0) && 
            <Row className='mb-2' xs={1} md={2} lg={4}>
                <EqualHeight>
                    {Object.keys(allRequests).length !== 0 &&
                    allRequests.requests.map((request) => (
                    <Col className='mb-4' key={request.id}>
                        <div
                            className='order-item'
                            onClick={() => navigate(`/director/request/${user.user_type !== 'volunteer' ? user.user_type : typeList[activeFromIdx]}/${request.id}`)}
                        > 
                          <EqualHeightElement>
                            <RequestCard
                                request={request}
                            />
                          </EqualHeightElement>
                        </div>
                    </Col>
                    ))}
                </EqualHeight>
            </Row>
        }
        {allRequests.total > 0 &&
        <div className='d-flex justify-content-center'>
            <Pagination
            pageCount={Math.ceil(allRequests.total / REQUESTS_COUNT)}
            activeIdx={page}
            onChangePage={onChangePage}
            />
        </div>
        }
    </>
  );
};

export default ManageRequestList;
