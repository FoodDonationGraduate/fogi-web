// Essentials
import React from 'react';
import { Container } from 'react-bootstrap';

// Components
import TableHeader from './TableHeader';
import TableFilter from './TableFilter';
import TableDivider from './TableDivider';
import TableItem from './TableItem';
import TableSubHeader from './TableSubHeader';
import Pagination from 'components/common/pagination/Pagination';

const Table = ({
  headerList,
  filterList,
  itemList,
  sortFields, setSortFields,
  actionList,
  total, pageCount, page, setPage, // Pagination
  type='request'
}) => {

  const getEmptyText = () => {
    switch (type) {
      case 'request': return 'Yêu cầu';
      case 'parent-food': return 'Hạng mục con';
      case 'category': return 'Hạng mục';
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
          <TableSubHeader text={`Tổng: ${total}`} />
          {itemList && itemList.map((item, idx) => (
            <TableItem key={idx} idx={idx} item={item} type={type} actionList={actionList} />
          ))}
          {(!itemList || itemList.length === 0) &&
            <div className='text-center'>Không có {getEmptyText()} nào để hiển thị</div>
          }
          <div className='d-flex justify-content-start mt-4'>
            <Pagination
              pageCount={Math.ceil(total / pageCount)}
              activeIdx={page}
              onChangePage={setPage}
              pillSize='sm'
            />
          </div>
        </Container>
      </div>
    </>
  );
};

export default Table;