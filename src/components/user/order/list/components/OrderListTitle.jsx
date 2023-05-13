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
            <h2>Yêu cầu của bạn</h2>
          </Col>
          <Col className='d-flex justify-content-end' xs={6} sm={3}>
            <DropdownButton
              variant='outline-secondary'
              title='Sắp xếp'
            >
              <Dropdown.Item>Ngày tạo</Dropdown.Item>
              <Dropdown.Item>Trạng thái</Dropdown.Item>
              <Dropdown.Item>Không có</Dropdown.Item>
            </DropdownButton>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default OrderListTitle;
