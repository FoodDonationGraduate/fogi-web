// Essentials
import React from 'react';
import { Row } from 'react-bootstrap';

// Components
import TableFilterRequest from './tableFilter/templates/TableFilterRequest';
import TableFilterParentFood from './tableFilter/templates/TableFilterParentFood';

const TableFilter = ({
  filterList,
  type
}) => {
  
  return (
    <Row className='mn-table-item'>
      {type === 'request' && <TableFilterRequest filterList={filterList} />}
      {type === 'parent-food' && <TableFilterParentFood filterList={filterList} />}
    </Row>
  );
}

export default TableFilter;