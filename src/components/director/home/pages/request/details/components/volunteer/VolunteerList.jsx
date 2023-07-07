// Essentials
import React, { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';

// Components
import ListTitle from 'components/common/ListTitle';
import Pagination from 'components/common/pagination/Pagination';

import VolunteerCard from './VolunteerCard';

// Reducers
import { retrieveAvailableVolunteers } from 'components/redux/reducer/DirectorReducer';

const VolunteerList = ({
  targetVolunteer, setTargetVolunteer
}) => {
  const availableVolunteers = useSelector(state => state.directorReducer.availableVolunteers);
  const userInfo = useSelector(state => state.authenticationReducer.user);
  const userToken = useSelector(state => state.authenticationReducer.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Pagination handling
  const VOLUNTEER_COUNT = 4; // per page
  const [page, setPage] = useState(0); // a.k.a activeIdx
  const onChangePage = async (idx) => {
    setPage(idx);
    await dispatch(retrieveAvailableVolunteers(
      {
        limit: VOLUNTEER_COUNT,
        offset: idx * VOLUNTEER_COUNT
      },
      { userInfo, userToken },
      navigate
    ));
  };

  // Get Available Volunteers
  useEffect(() => {
    setPage(0);
    dispatch(retrieveAvailableVolunteers(
      {
        limit: VOLUNTEER_COUNT,
        offset: 0
      },
      { userInfo, userToken },
      navigate
    ));
  }, []);

  return (
    <>
      <Container>
        <ListTitle title={'Chọn Tình nguyện viên'} />
        <Row xs={1}>
          {Object.keys(availableVolunteers).length !== 0
          && availableVolunteers.volunteers.map((volunteer, idx) => (
            <Col className='mb-3' key={idx}>
              <VolunteerCard
                volunteer={volunteer}
                targetVolunteer={targetVolunteer} setTargetVolunteer={setTargetVolunteer}
              />
            </Col>
          ))}
        </Row>
      </Container>
      <div className='d-flex justify-content-center mt-2'>
        <Pagination
          pageCount={Math.ceil(availableVolunteers.total_volunteers / VOLUNTEER_COUNT)}
          activeIdx={page}
          onChangePage={onChangePage}
        />
      </div>
    </>
  )
};

export default VolunteerList;