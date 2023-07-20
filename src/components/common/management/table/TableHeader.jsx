// Essentials
import React from 'react';
import { Col, Row } from 'react-bootstrap';

const TableHeader = ({
  headerList
}) => {
  
  return (
    <>
      <Row>
        {headerList && headerList.map((header, idx) => (
          <Col
            key={idx}
            className='mn-table-header'
            xs={header.size}
          >
            {header.label}
          </Col>
        ))}
      </Row>
    </>
  );
}

export default TableHeader;