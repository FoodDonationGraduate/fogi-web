// Essentials
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { EqualHeight } from 'react-equal-height';

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { retrieveUnverifiedDonees, retrieveUnverifiedVolunteers } from 'components/redux/reducer/DirectorReducer';

// Components
import ApproveItem from './ApproveItem';
import Pagination from 'components/common/pagination/Pagination';

const ApproveList = () => {
  const unverifiedDonees = useSelector(state => state.directorReducer.unverifiedDonees);
  const unverifiedVolunteers = useSelector(state => state.directorReducer.unverifiedVolunteers);
  const user_type = useSelector(state => state.directorReducer.user_type);
  const userInfo = useSelector(state => state.authenticationReducer.user);
  const userToken = useSelector(state => state.authenticationReducer.token);

  const APPROVE_COUNT = 4; // per page
  const [pageDonee, setPageDonee] = useState(0);
  const [pageVolunteer, setPageVolunteer] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onChangePageDonee = async (idx) => {
    setPageDonee(idx);
    await dispatch(retrieveUnverifiedDonees(
      {
        limit: APPROVE_COUNT,
        offset: idx * APPROVE_COUNT
      }, {
        userInfo,
        userToken
      },
      navigate
    ));
  };
  const onChangePageVolunteer = async (idx) => {
    setPageVolunteer(idx);
    await dispatch(retrieveUnverifiedVolunteers(
      {
        limit: APPROVE_COUNT,
        offset: idx * APPROVE_COUNT
      }, {
        userInfo,
        userToken
      },
      navigate
    ));
  };
  
  useEffect(() => {
    dispatch(retrieveUnverifiedDonees(
      {
        limit: APPROVE_COUNT,
        offset: pageDonee * APPROVE_COUNT,
      }, {
        userInfo,
        userToken
      },
      navigate
    ));
    dispatch(retrieveUnverifiedVolunteers(
      {
        limit: APPROVE_COUNT,
        offset: pageVolunteer * APPROVE_COUNT,
      }, {
        userInfo,
        userToken
      },
      navigate
    ));
  }, [user_type]);

  return (
    <Container>
      <Row>
        <Col className='px-0'>
          <Row className='mb-4' xs={1} md={2}>
            <EqualHeight>
              {(user_type === 'donee' && Object.keys(unverifiedDonees).length !== 0) &&
              unverifiedDonees.users.map((user) => (
                <Col className='mb-4' key={user.email}>
                  <ApproveItem
                    approve={user}
                    approveCount={APPROVE_COUNT}
                    currentPage={pageDonee}
                    user_type={user_type}
                    userInfo={userInfo}
                    userToken={userToken}
                  />
                </Col>
              ))}
              {(user_type === 'volunteer' && Object.keys(unverifiedVolunteers).length !== 0) &&
              unverifiedVolunteers.users.map((user) => (
                <Col className='mb-4' key={user.email}>
                  <ApproveItem
                    approve={user}
                    approveCount={APPROVE_COUNT}
                    currentPage={pageVolunteer}
                    user_type={user_type}
                    userInfo={userInfo}
                    userToken={userToken}
                  />
                </Col>
              ))}
            </EqualHeight>
          </Row>
          <div className='d-flex justify-content-center'>
            {(user_type === 'donee' && Object.keys(unverifiedDonees).length !== 0) &&
              <Pagination
                pageCount={Math.ceil(unverifiedDonees.total_users / APPROVE_COUNT)}
                activeIdx={pageDonee}
                onChangePage={onChangePageDonee}
              />
            }
            {(user_type === 'volunteer' && Object.keys(unverifiedVolunteers).length !== 0) &&
              <Pagination
                pageCount={Math.ceil(unverifiedVolunteers.total_users / APPROVE_COUNT)}
                activeIdx={pageVolunteer}
                onChangePage={onChangePageVolunteer}
              />
            }
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ApproveList;
