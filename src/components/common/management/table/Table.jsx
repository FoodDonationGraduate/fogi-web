// Essentials
import React from 'react';
import { Container } from 'react-bootstrap';

// Components
import TableHeader from './TableHeader';
import TableFilter from './TableFilter';
import TableDivider from './TableDivider';
import TableItem from './TableItem';
import TableSubHeader from './TableSubHeader';

const Table = ({
  headerList,
  filterList,
  itemList,
  sortFields, setSortFields,
  total=null,
  type='request'
}) => {

  const getEmptyText = () => {
    switch (type) {
      case 'request': return 'Yêu cầu';
      case 'parent-food': return 'Hạng mục con';
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
          {total && <TableSubHeader text={`Tổng: ${total}`} /> }
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