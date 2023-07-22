// Essentials
import React from 'react';
import { Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';

const TableHeader = ({
  headerList
}) => {
  
  return (
    <>
      <Row>
        {headerList && headerList.map((header, idx) => (
          <OverlayTrigger
            placement='top'
            overlay={header.tip ?
              <Tooltip style={{ position: 'fixed' }}>
                {header.tip}
              </Tooltip> : <></>
            }
          >
            <Col
              key={idx}
              className={`mn-table-header ${header.tip ? 'mn-underline' : ''}`}
              xs={header.size}
            >
              {header.label}
            </Col>
          </OverlayTrigger>
        ))}
      </Row>
    </>
  );
}

export default TableHeader;