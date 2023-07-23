// Essentials
import React from 'react';
import { Col, Row } from 'react-bootstrap';

const TableSubHeader = ({
  text
}) => {
  
  return (
    <>
      <Row className='mb-2'>
        <Col className='mn-table-header-static'>
          <div>{text}</div>
        </Col>
      </Row>
    </>
  );
}

export default TableSubHeader;