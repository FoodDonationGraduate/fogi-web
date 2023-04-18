// Essentials
import React from 'react';
import { Col, Row, Dropdown, DropdownButton } from 'react-bootstrap';

// Styling
import 'assets/css/Fogi.css';

const ListTitle = () => {
  return (
    <Row className='mb-4'>
      <Col className='ps-0'>
        <h2 className='fw-bold'>Approve users</h2>
      </Col>
      <Col className='d-flex justify-content-end' xs={6} sm={3}>
        <DropdownButton
          variant='outline-secondary'
          title='Sort by'
        >
          <Dropdown.Item>Donee</Dropdown.Item>
          <Dropdown.Item>Volunteer</Dropdown.Item>
        </DropdownButton>
      </Col>
    </Row>
  );
};

export default ListTitle;