// Essentials
import * as React from 'react';
import { Col, Row } from 'react-bootstrap';

// Styling
import 'assets/css/Fogi.css';

const ListTitle = () => {
  return (
    <Row className='mb-4'>
      <Col className='ps-0'>
        <h2 className='fw-bold'>Danh sách Yêu cầu</h2>
      </Col>
    </Row>
  );
};

export default ListTitle;
