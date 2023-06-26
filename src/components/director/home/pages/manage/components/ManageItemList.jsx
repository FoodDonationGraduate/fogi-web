// Essentials
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { EqualHeight } from 'react-equal-height';

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { retrieveManageUsers } from 'components/redux/reducer/DirectorReducer';

// Components
import ManageItem from './ManageItem';
import Pagination from 'components/common/pagination/Pagination';

const ManageItemList = ({ setTargetUser }) => {
  const manageUsers = useSelector(state => state.directorReducer.manageUsers);
  const user_type = useSelector(state => state.directorReducer.user_type);
  const userInfo = useSelector(state => state.authenticationReducer.user);
  const userToken = useSelector(state => state.authenticationReducer.token);

  const MANAGE_COUNT = 4; // per page
  const [page, setPage] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onChangePage = async (idx) => {
    setPage(idx);
    await dispatch(retrieveManageUsers(
      {
        limit: MANAGE_COUNT,
        offset: idx * MANAGE_COUNT,
        user_type: user_type
      }, {
        userInfo,
        userToken
      },
      navigate
    ));
  };
  
  useEffect(() => {
    setPage(0);
    dispatch(retrieveManageUsers(
      {
        limit: MANAGE_COUNT,
        offset: 0,
        user_type: user_type
      }, {
        userInfo,
        userToken
      },
      navigate
    ));
  }, [user_type]);

  return (
    <Row>
      <Col className='px-0'>
        <Row className='mb-4' xs={1} md={2}>
          <EqualHeight>
            {Object.keys(manageUsers).length !== 0 &&
            manageUsers.users.map((user) => (
              <Col className='mb-4' key={user.email} onClick={() => setTargetUser(user)}>
                <ManageItem
                  user={user}
                />
              </Col>
            ))}
          </EqualHeight>
        </Row>
        <div className='d-flex justify-content-center'>
          <Pagination
            pageCount={Math.ceil(manageUsers.num_of_users / MANAGE_COUNT)}
            activeIdx={page}
            onChangePage={onChangePage}
          />
        </div>
      </Col>
    </Row>
  );
};

export default ManageItemList;