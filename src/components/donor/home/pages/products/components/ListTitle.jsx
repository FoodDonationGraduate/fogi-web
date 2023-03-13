// Essentials
import * as React from 'react';
import { Button, Container, Col, Dropdown, Row } from 'react-bootstrap';

// Styling
import 'assets/css/Fogi.css';

const ListTitle = ({
  onShow
}) => {
  return (
    <Row className='mb-4'>
      <Col className='ps-0'>
        <h2 className='fw-bold'>Your Products</h2>
      </Col>
      <Col className='pe-0 d-flex justify-content-end' sm={4} md={3} lg={3}>
        <Button
          className='fogi' variant='primary'
          onClick={onShow}
        >
          Post Product
        </Button>
      </Col>
    </Row>
  );
};

export default ListTitle;
