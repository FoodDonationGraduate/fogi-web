// Essentials
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { EqualHeight } from 'react-equal-height';

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { retrieveUnverifiedUsers } from 'components/redux/reducer/DirectorReducer';

// Components
import ApproveItem from './ApproveItem';
import Pagination from 'components/common/pagination/Pagination';

// Data
import { USER_DATA } from 'utils/constants/User.jsx';

const ApproveList = () => {
  const unverifiedUsers = useSelector(state => state.directorReducer.unverifiedUsers);
  const userInfo = useSelector(state => state.authenticationReducer.user);
  const userToken = useSelector(state => state.authenticationReducer.token);

  const APPROVE_COUNT = 4; // per page
  const [page, setPage] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onChangePage = async (idx) => {
    setPage(idx);
    await dispatch(retrieveUnverifiedUsers(
      {
        limit: APPROVE_COUNT,
        offset: idx * APPROVE_COUNT,
        user_type: 'donee'
      }, {
        userInfo,
        userToken
      },
      navigate
    ));
  };
  useEffect(() => {
    dispatch(retrieveUnverifiedUsers({
        limit: APPROVE_COUNT,
        offset: page * APPROVE_COUNT,
        user_type: 'donee' 
      }, {
        userInfo,
        userToken
      },
      navigate
    ));
  }, []);

  return (
    <Container>
      <Row>
        <Col className='px-0'>
          <Row className='mb-4' xs={1} md={2}>
            <EqualHeight>
              {Object.keys(unverifiedUsers).length !== 0 && unverifiedUsers.users.map((user) => (
                <Col className='mb-4' key={user.email}>
                  <ApproveItem approve={user} />
                </Col>
              ))}
            </EqualHeight>
          </Row>
          <div className='d-flex justify-content-center'>
            <Pagination
              pageCount={Math.ceil(unverifiedUsers.total_users / APPROVE_COUNT)}
              activeIdx={page}
              onChangePage={onChangePage}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ApproveList;
