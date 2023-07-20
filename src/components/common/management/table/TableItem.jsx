// Essentials
import React from 'react';

// Components
import TableItemRequest from './tableItem/templates/TableItemRequest';

const TableItem = ({
  item,
  type
}) => {
  
  return (
    <>
      {type === 'request' && <TableItemRequest request={item} />}
    </>
  );
}

export default TableItem;