// Essentials
import React from 'react';
import { Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';

// Assets
import { MdSort } from 'react-icons/md';

const TableHeader = ({
  headerList,
  sortField, setSortField
}) => {

  const getStyle = (header) => {
    if (header.sort_field && header.sort_field === sortField) return '-active';
    if (!header.sort_field) return '-static';
    return '';
  };

  const onClick = (header) => {
    if (!header.sort_field) return;
    setSortField(header.sort_field);
  };
  
  return (
    <>
      <Row>
        {headerList && headerList.map((header, idx) => (
          <OverlayTrigger
            key={idx}
            placement='top'
            overlay={header.tip ?
              <Tooltip style={{ position: 'fixed' }}>
                {header.tip}
              </Tooltip> : <></>
            }
          >
            <Col
              className={`mn-table-header${getStyle(header)} ${header.tip ? 'mn-underline' : ''}`}
              onClick={() => onClick(header)}
              xs={header.size}
            >
              <div
                className='d-flex align-items-center justify-content-between'
              >
                <div>{header.label}</div>
                {header.sort_field ? <MdSort /> : <div />}
              </div>
            </Col>
          </OverlayTrigger>
        ))}
      </Row>
    </>
  );
}

export default TableHeader;