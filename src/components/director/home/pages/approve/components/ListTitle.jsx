// Essentials
import React, { useState, useEffect } from 'react';
import { Col, Row, Dropdown, DropdownButton } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

// Styling
import 'assets/css/Fogi.css';

// Redux
import { setTypeOfUser } from 'components/redux/reducer/DirectorReducer';

const ListTitle = () => {
  const user_type = useSelector(state => state.directorReducer.user_type);
  const dispatch = useDispatch();

  return (
    <Row className='mb-4'>
      <Col className='ps-0'>
        <h2 className='fw-bold'>Xét duyệt Người dùng</h2>
      </Col>
      <Col className='d-flex justify-content-end' xs={6} sm={3}>
        <DropdownButton
          variant='outline-secondary'
          title={user_type === 'donee' ? 'Donee' : (user_type === 'donor' ? 'Donor' : 'Volunteer')}
        >
          <Dropdown.Item onClick={() => dispatch(setTypeOfUser('donee'))}>Donee</Dropdown.Item>
          <Dropdown.Item onClick={() => dispatch(setTypeOfUser('donor'))}>Donor</Dropdown.Item>
          <Dropdown.Item onClick={() => dispatch(setTypeOfUser('volunteer'))}>Volunteer</Dropdown.Item>
        </DropdownButton>
      </Col>
    </Row>
  );
};

export default ListTitle;