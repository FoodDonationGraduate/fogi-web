// Essentials
import React from 'react';
import { Button, Container, Col, Row } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import RequestInfoCard from './RequestInfoCard';

// Styling
import 'assets/css/Fogi.css';

const CartTitle = () => {
  const [isActive, setActive] = React.useState(false);
  
  return (
    <div className='bg'>
      <Container>
        <Row className='py-4'>
          <Col>
            <h2>Giỏ hàng</h2>
          </Col>
          <Col className='d-flex justify-content-end' xs={6} sm={3}>
            <Button className='fogi' variant='primary' onClick={() => setActive(true)}>Tạo Yêu cầu</Button>
          </Col>
        </Row>
      </Container>
      <RequestInfoCard 
        isActive={isActive === true}
        setActive={setActive}
      />
    </div>
  );
};

export default CartTitle;
