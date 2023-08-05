// Essentials
import React from 'react';
import { Row } from 'react-bootstrap';

// Components
import TableItemRequest from './tableItem/templates/TableItemRequest';
import TableItemParentFood from './tableItem/templates/TableItemParentFood';
import TableItemCategory from './tableItem/templates/TableItemCategory';
import TableItemUnsortedFood from './tableItem/templates/TableItemUnsortedFood';
import TableItemUser from './tableItem/templates/TableItemUser';
import TableItemNews from './tableItem/templates/TableItemNews';
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
      {type === 'category' && <TableItemCategory category={item} actionList={actionList}/>}
      {type === 'unsorted-food' && <TableItemUnsortedFood food={item} actionList={actionList} />}
      {type === 'user' && <TableItemUser user={item} actionList={actionList} />}
      {type === 'news' && <TableItemNews news={item} actionList={actionList} />}
    </Row>
  );
}

export default TableItem;