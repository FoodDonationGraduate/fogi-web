// Essentials
import React from 'react';
import { Container } from 'react-bootstrap';

// Components
import TableHeader from './TableHeader';
import TableFilter from './TableFilter';
import TableDivider from './TableDivider';
import TableItem from './TableItem';

const Table = ({
  headerList,
  filterList,
  itemList,
  type='request'
}) => {

  return (
    <>
      <div className='mn-table'>
        <Container fluid>
          <TableHeader headerList={headerList} />
          <div className='mt-2' />
          <TableFilter filterList={filterList} type={type} />
          <TableDivider />
          {itemList && itemList.map((item, idx) => (
            <TableItem key={idx} idx={idx} item={item} type={type} />
          ))}
        </Container>
      </div>
    </>
  );
};

export default Table;