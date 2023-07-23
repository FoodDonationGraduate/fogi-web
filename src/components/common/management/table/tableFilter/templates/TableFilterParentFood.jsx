// Essentials
import React from 'react';
import { Col, Stack } from 'react-bootstrap';

// Components
import { TableFilterText, TableFilterRange } from '../components/TableFilterInput';
import TableFilterTime from '../components/TableFilterTime';

const TableFilterParentFood = ({
  filterList
}) => {

  return (
    <>
      <Col className='mn-table-item-col' xs={3}>
        <TableFilterText
          input={filterList[0].state} setInput={filterList[0].setState}
          placeholder='Tên Hạng mục con'
        />
      </Col>
      <Col className='mn-table-item-col' xs={3}>
        
      </Col>
      <Col className='mn-table-item-col' xs={2}>
        <Stack direction='horizontal' gap={2}>
          <TableFilterRange
            range={filterList[2].state} setRange={filterList[2].setState}
            placeholder='Tất cả'
          />
        </Stack>
      </Col>
      <Col className='mn-table-item-col' xs={2}>
        <TableFilterTime
          date={filterList[4].state} setDate={filterList[4].setState}
        />
      </Col>
      <Col className='mn-table-item-col' xs={2}>
        <TableFilterTime
          date={filterList[5].state} setDate={filterList[5].setState}
        />
      </Col>
    </>
  );
};

export default TableFilterParentFood;
