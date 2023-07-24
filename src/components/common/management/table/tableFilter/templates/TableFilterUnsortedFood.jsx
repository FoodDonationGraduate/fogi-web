// Essentials
import React from 'react';
import { Col, Row } from 'react-bootstrap';

// Components
import { TableFilterText, TableFilterRange } from '../components/TableFilterInput';
import TableFilterSelect from '../components/TableFilterSelect';
import TableFilterMultiple from '../components/TableFilterMultiple';
import TableFilterTime from '../components/TableFilterTime';

// Reducer
import { retrieveAllCategories } from 'components/redux/reducer/CategoryReducer';

const TableFilterUnsortedFood = ({
  filterList
}) => {
  const unitList = [
    { value: '', label: 'Tất cả' },
    { value: 'kg', label: 'Kg' },
    { value: 'item', label: 'Cái' }
  ];

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
