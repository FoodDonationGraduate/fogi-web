// Essentials
import React from 'react';
import { Row } from 'react-bootstrap';

// Components
import TableItemRequest from './tableItem/templates/TableItemRequest';
import TableItemParentFood from './tableItem/templates/TableItemParentFood';

const TableItem = ({
  idx,
  item,
  type
}) => {
  
  return (
    <Row className={`mn-table-item ${idx % 2 === 0 ? 'mn-bg-light' : ''}`}>
      {type === 'request' && <TableItemRequest request={item} />}
      {type === 'parent-food' && <TableItemParentFood parentFood={item} />}
    </Row>
  );
}

export default TableItem;