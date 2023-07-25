// Essentials
import React from 'react';
import { Row } from 'react-bootstrap';

// Components
import TableFilterRequest from './tableFilter/templates/TableFilterRequest';
import TableFilterParentFood from './tableFilter/templates/TableFilterParentFood';
import TableFilterCategory from './tableFilter/templates/TableFilterCategory';
import TableFilterUser from './tableFilter/templates/TableFilterUser';
import TableFilterUnsortedFood from './tableFilter/templates/TableFilterUnsortedFood';

const TableFilter = ({
  filterList,
  type
}) => {
  
  return (
    <Row className='mn-table-item'>
      {(type === 'request' || type === 'request-keeper') && <TableFilterRequest filterList={filterList} />}
      {type === 'parent-food' && <TableFilterParentFood filterList={filterList} />}
      {type === 'category' && <TableFilterCategory filterList={filterList} />}
      {type === 'user' && <TableFilterUser filterList={filterList} />}
      {type === 'unsorted-food' && <TableFilterUnsortedFood filterList={filterList} />}
    </Row>
  );
}

export default TableFilter;