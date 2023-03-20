// Essentials
import React from 'react';
import { Container, Col, Row, Dropdown, DropdownButton } from 'react-bootstrap';

// Styling
import 'assets/css/Fogi.css';

const OrderListTitle = () => {

  return (
    <div className='bg'>
      <Container>
        <Row className='pt-4'>
          <Col>
            <h2>My Orders</h2>
          </Col>
          <Col className='d-flex justify-content-end' xs={6} sm={3}>
            <DropdownButton
              variant='outline-secondary'
              title='Sort by'
            >
              <Dropdown.Item>Total cost</Dropdown.Item>
              <Dropdown.Item>Order date</Dropdown.Item>
              <Dropdown.Item>Status</Dropdown.Item>
              <Dropdown.Item>None</Dropdown.Item>
            </DropdownButton>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default OrderListTitle;
