// Essentials
import React from 'react';
import { Row } from 'react-bootstrap';

// Components
import TableItemRequest from './tableItem/templates/TableItemRequest';
import TableItemParentFood from './tableItem/templates/TableItemParentFood';
import TableItemCategory from './tableItem/templates/TableItemCategory';
import TableItemUnsortedFood from './tableItem/templates/TableItemUnsortedFood';

const TableItem = ({
  idx,
  item,
  type,
  actionList
}) => {
  
  return (
    <Row className={`mn-table-item ${idx % 2 === 0 ? 'mn-bg-light' : ''}`}>
      {(type === 'request' || type === 'request-keeper') && <TableItemRequest request={item} />}
      {type === 'parent-food' && <TableItemParentFood parentFood={item} />}
      {type === 'category' && <TableItemCategory category={item} />}
      {type === 'unsorted-food' && <TableItemUnsortedFood food={item} actionList={actionList} />}
    </Row>
  );
}

export default TableItem;