// Essentials
import React from 'react';

// Components
import TableHeader from './TableHeader';
import TableDivider from './TableDivider';
import TableItem from './TableItem';

const Table = ({
  headerList,
  itemList,
  type='request'
}) => {

  return (
    <>
      <div className='mn-table'>
        <TableHeader headerList={headerList} />
        <TableDivider />
        {itemList && itemList.map((item, idx) => (
          <TableItem key={idx} idx={idx} item={item} type={type} />
        ))}
      </div>
    </>
  );
};

export default Table;