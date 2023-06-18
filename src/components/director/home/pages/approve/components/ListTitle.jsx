// Essentials
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

// Styling
import 'assets/css/Fogi.css';

const ListTitle = () => {

  return (
    <Container> 
      <Row className='mb-4'>
        <Col>
          <h2 className='fw-bold'>Xét duyệt Người dùng</h2>
        </Col>
      </Row>
    </Container>
  );
};

export default ListTitle;