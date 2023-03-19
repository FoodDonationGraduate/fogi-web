// Essentials
import React from 'react';
import { Button, Container, Col, Row } from 'react-bootstrap';

// Styling
import 'assets/css/Fogi.css';

// Utility
import { useResizer } from 'utils/helpers/Resizer';

const CartTitle = ({}) => {

  return (
    <div className='bg'>
      <Container>
        <Row className='pt-4'>
          <Col>
            <h2>My Cart</h2>
          </Col>
          <Col className='d-flex justify-content-end' xs={2}>
            <Button className='fogi' variant='primary'>Check out</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CartTitle;
