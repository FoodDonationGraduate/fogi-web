// Essentials
import * as React from 'react';
import { Button, Container, Col, Dropdown, Row } from 'react-bootstrap';

// Styling
import 'assets/css/Fogi.css';

const ListTitle = ({
  onShow
}) => {
  return (
    <div className='bg'>
      <Container>
        <Row>
          <Col>
            <h2 className='fw-bold'>Your Products</h2>
          </Col>
          <Col className='d-flex justify-content-end' md={2} lg={2}>
            <Button
              className='fogi' variant='primary'
              onClick={onShow}
            >
              Post Product
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ListTitle;
