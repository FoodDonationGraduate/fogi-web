// Essentials
import React from 'react';
import { Row } from 'react-bootstrap';

// Components
import TableFilterRequest from './tableFilter/templates/TableFilterRequest';
import TableFilterUser from './tableFilter/templates/TableFilterUser';
const TableFilter = ({
  filterList,
  type
}) => {
  
  return (
    <Row className='mn-table-item'>
      {type === 'request' && <TableFilterRequest filterList={filterList} />}
      {type === 'user' && <TableFilterUser filterList={filterList} />}
    </Row>
  );
}

export default TableFilter;