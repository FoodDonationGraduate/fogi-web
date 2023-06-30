// Essentials
import * as React from 'react';
import { Container, Col, Row } from 'react-bootstrap';

// Styling
import 'assets/css/Fogi.css';

const ListTitle = ({title}) => {
  return (
    <div className='bg'>
      <Container>
        <Row className='pt-4'>
          <Col>
            <h2>{title}</h2>
          </Col>
          {/* <Col className='d-flex justify-content-end' md={2} lg={2}>
            <DropdownButton
              variant='outline-secondary'
              title={sort !== '' ? (sort === 'price' ? 'Price' : (sort === 'expired_time' ? 'Date' : 'Count')) : 'Sort by'}
            >
              <Dropdown.Item onClick={() => dispatch(setTypeOfSort('price'))}>Price</Dropdown.Item>
              <Dropdown.Item onClick={() => dispatch(setTypeOfSort('expired_time'))}>Date</Dropdown.Item>
              <Dropdown.Item onClick={() => dispatch(setTypeOfSort('stock'))}>Count</Dropdown.Item>
              <Dropdown.Item onClick={() => dispatch(setTypeOfSort(''))}>None</Dropdown.Item>
            </DropdownButton>
          </Col> */}
          
        </Row>
      </Container>
    </div>
  );
};

export default ListTitle;
