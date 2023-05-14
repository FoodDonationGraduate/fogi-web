// Essentials
import React from 'react';
import { Button, Container, Col, Row } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

// Styling
import 'assets/css/Fogi.css';

const CartTitle = () => {
  const navigate = useNavigate(); 

  return (
    <div className='bg'>
      <Container>
        <Row className='pt-4'>
          <Col>
            <h2>Giỏ hàng</h2>
          </Col>
          <Col className='d-flex justify-content-end' xs={6} sm={3}>
            <Button className='fogi' variant='primary' onClick={() => navigate('/create-request')}>Tạo Yêu cầu</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CartTitle;
