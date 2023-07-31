// Essentials
import React from 'react';
import { Col } from 'react-bootstrap';

// Components
import { TableFilterText } from '../components/TableFilterInput';

const TableFilterUnsortedFood = ({
  filterList
}) => {

  return (
    <>
      <Col className='mn-table-item-col' xs={5}>
        <TableFilterText
          input={filterList[0].state} setInput={filterList[0].setState}
          placeholder='Tên Thực phẩm'
        />
      </Col>
      <Col className='mn-table-item-col' xs={3}>
        
      </Col>
      <Col className='mn-table-item-col' xs={3}>
        
      </Col>
      <Col className='mn-table-item-col' xs={1}>

      </Col>
    </>
  );
};

export default TableFilterUnsortedFood;
