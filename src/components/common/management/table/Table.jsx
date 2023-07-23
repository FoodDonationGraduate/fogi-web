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
  sortFields, setSortFields,
  type='request'
}) => {

  const getEmptyText = () => {
    switch (type) {
      case 'request': return 'Yêu cầu'
      default: return 'Dữ liệu';
    };
  };

  return (
    <>
      <div className='mn-table'>
        <Container fluid>
          <TableHeader headerList={headerList} sortFields={sortFields} setSortFields={setSortFields} />
          <TableDivider />
          <TableFilter filterList={filterList} type={type} />
          <TableDivider />
          {itemList && itemList.map((item, idx) => (
            <TableItem key={idx} idx={idx} item={item} type={type} />
          ))}
          {(!itemList || itemList.length === 0) &&
            <div className='text-center'>Không có {getEmptyText()} nào để hiển thị</div>
          }
        </Container>
      </div>
    </>
  );
};

export default Table;