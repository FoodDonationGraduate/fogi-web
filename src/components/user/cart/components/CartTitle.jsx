// Essentials
import React from 'react';
import { Button, Container, Col, Row } from 'react-bootstrap';

// Styling
import 'assets/css/Fogi.css';

const CartTitle = ({ onShow }) => {

  return (
    <div className='bg'>
      <Container>
        <Row className='pt-4'>
          <Col>
            <h2>Giỏ hàng</h2>
          </Col>
          <Col className='d-flex justify-content-end' xs={6} sm={3}>
            <Button className='fogi' variant='primary' onClick={onShow}>Tạo Yêu cầu</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CartTitle;
