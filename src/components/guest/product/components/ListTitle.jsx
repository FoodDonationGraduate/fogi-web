// Essentials
import * as React from 'react';
import { Container, Col, Dropdown, DropdownButton, Row } from 'react-bootstrap';

// Styling
import 'assets/css/Fogi.css';

const ListTitle = () => {
  return (
    <div className='bg'>
      <Container>
        <Row className='pt-4'>
          <Col>
            <h2>Product List</h2>
          </Col>
          <Col className='d-flex justify-content-end' md={2} lg={2}>
            <DropdownButton
              variant='outline-secondary'
              title='Sort by'
            >
              <Dropdown.Item>Price</Dropdown.Item>
              <Dropdown.Item>Date</Dropdown.Item>
              <Dropdown.Item>Count</Dropdown.Item>
            </DropdownButton>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ListTitle;
