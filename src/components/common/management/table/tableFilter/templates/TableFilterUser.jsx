// Essentials
import React from 'react';
import { Col } from 'react-bootstrap';

// Components
import { TableFilterText, TableFilterRange } from '../components/TableFilterInput';
import TableFilterSelect from '../components/TableFilterSelect';

const TableFilterRequest = ({
  filterList
}) => {

  // Constants
  // const fromList = [
  //   { value: ['donor', ''], icon: MdUpload, tip: 'Cho' },
  //   { value: ['donee', 'delivery'], icon: MdLocalShipping, tip: 'Nhận (Giao hàng)' },
  //   { value: ['donee', 'pickup'], icon: MdWarehouse, tip: 'Nhận (Tại kho)' }
  // ];

  const statusList = [
      { value: '', label: 'Tất cả' },
      { value: 'locked', label: 'Bị khóa' },
      { value: 'not_info_verified', label: 'Bị hạn chế' },
  ];

  return (
    <>
      <Col className='mn-table-item-col' xs={2}>
       <TableFilterText
          input={filterList[1].state} setInput={filterList[1].setState}
          placeholder='Tất cả' type='text'
        />
      </Col>
      <Col className='mn-table-item-col' xs={2}>
       <TableFilterText
          input={filterList[2].state} setInput={filterList[2].setState}
          placeholder='Tất cả' type='text'
        />
      </Col>
      {filterList[0].state === 'donor' &&
      <Col className='mn-table-item-col' xs={2}>
        <TableFilterRange
          range={filterList[3].state} setRange={filterList[3].setState}
          placeholder='Tất cả'
        />
      </Col>
      }
      {filterList[0].state === 'donee' &&
      <Col className='mn-table-item-col' xs={2}>
        <TableFilterRange
          range={filterList[4].state} setRange={filterList[4].setState}
          placeholder='Tất cả'
        />
      </Col>
      }
      {filterList[0].state === 'volunteer' ?
        <>
        <Col className='mn-table-item-col' xs={2}>
          <TableFilterRange
            range={filterList[3].state} setRange={filterList[3].setState}
            placeholder='Tất cả'
          />
        </Col>
        <Col className='mn-table-item-col' xs={2}>
          <TableFilterRange
            range={filterList[4].state} setRange={filterList[4].setState}
            placeholder='Tất cả'
          />
        </Col>
        </>
        :
        <>
        <Col className='mn-table-item-col' xs={1}>
          <TableFilterRange
            range={filterList[5].state} setRange={filterList[5].setState}
            placeholder='Tất cả'
          />
        </Col>
        <Col className='mn-table-item-col' xs={1}>
          <TableFilterRange
            range={filterList[6].state} setRange={filterList[6].setState}
            placeholder='Tất cả'
          />
        </Col>
        </>
      }
      
      <Col className='mn-table-item-col' xs={2}>
        <TableFilterRange
          range={filterList[7].state} setRange={filterList[7].setState}
          placeholder='Tất cả'
        />
      </Col>

      <Col className='mn-table-item-col' xs={2}>
        <TableFilterSelect
          activeOption={filterList[8].state} setActiveOption={filterList[8].setState}
          optionList={statusList}
        />
      </Col>
    </>
  );
};

export default TableFilterRequest;
