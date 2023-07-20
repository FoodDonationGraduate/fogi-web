// Essentials
import React from 'react';
import { Row } from 'react-bootstrap';

// Components
import TableItemRequest from './tableItem/templates/TableItemRequest';

const TableItem = ({
  idx,
  item,
  type
}) => {
  
  return (
    <Row className={`mn-table-item ${idx % 2 === 0 ? 'mn-bg-light' : ''}`}>
      {type === 'request' && <TableItemRequest request={item} />}
    </Row>
  );
}

export default TableItem;