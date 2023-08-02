// Essentials
import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Stack, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';

// Components
import Pagination from 'components/common/pagination/Pagination';

import VolunteerCard from './VolunteerCard';

// Reducers
import { retrieveAvailableVolunteers } from 'components/redux/reducer/DirectorReducer';

const VolunteerList = ({
  targetVolunteer, 
  setTargetVolunteer,
  auto_assign_volunteer=false,
  onUpdate
}) => {
  const availableVolunteers = useSelector(state => state.directorReducer.availableVolunteers);
  const userInfo = useSelector(state => state.authenticationReducer.user);
  const userToken = useSelector(state => state.authenticationReducer.token);
  const { from, id } = useParams();
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
        offset: 0,
        request_from: from,
        request_id: id
      },
      { userInfo, userToken },
      navigate
    ));
    // eslint-disable-next-line react-hooks/exhaustive-deps  
  }, []);

  // auto distribute volunteer
  const handleClick = () => {
    if (!auto_assign_volunteer) {
      onUpdate(true);
    }
  }
  return (
    <>
      <Container>
        <Stack direction='horizontal' className='mb-4'>
          <h2 className='fw-bold me-auto'>Chọn Tình nguyện viên</h2>
          <Button disabled={auto_assign_volunteer} onClick={() => handleClick()}>{auto_assign_volunteer ? 'Đã điều phối tự động' : 'Điều phối tự động'}</Button>
        </Stack>
        
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