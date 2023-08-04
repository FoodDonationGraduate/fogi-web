// Essentials
import React from 'react';
import { Col } from 'react-bootstrap';

// Components
import { TableFilterText, TableFilterRange } from '../components/TableFilterInput';
import TableFilterTime from '../components/TableFilterTime';

const TableFilterNews = ({
  filterList
}) => {

  return (
    <>
      <Col className='mn-table-item-col' xs={5}>
        <TableFilterText
          input={filterList[0].state} setInput={filterList[0].setState}
          placeholder='Tiêu đề Tin tức'
        />
      </Col>
      <Col className='mn-table-item-col' xs={1}>
        
      </Col>
      <Col className='mn-table-item-col' xs={2}>
        <TableFilterTime
          date={filterList[2].state} setDate={filterList[2].setState}
        />
      </Col>
      <Col className='mn-table-item-col' xs={2}>
        <TableFilterTime
          date={filterList[3].state} setDate={filterList[3].setState}
        />
      </Col>
      <Col className='mn-table-item-col' xs={2}>
        
      </Col>
    </>
  );
};

export default TableFilterNews;
