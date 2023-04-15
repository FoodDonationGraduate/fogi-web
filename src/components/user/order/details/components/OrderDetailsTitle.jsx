// Essentials
import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';

// Styling
import 'assets/css/Fogi.css';

const OrderListTitle = ({ id }) => {

  return (
    <div className='bg'>
      <Container>
        <Row className='pt-4'>
          <Col>
            <h2>Order {id}</h2>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default OrderListTitle;