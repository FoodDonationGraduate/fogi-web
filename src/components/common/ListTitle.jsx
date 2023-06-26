// Essentials
import * as React from 'react';
import { Col, Row } from 'react-bootstrap';

// Styling
import 'assets/css/Fogi.css';

const ListTitle = ({ title }) => {
  return (
    <Row className='mb-3'>
      <Col>
        <h2 className='fw-bold'>{title}</h2>
      </Col>
    </Row>
  );
};

export default ListTitle;
