// Essentials
import React from 'react';
import { Col, Stack } from 'react-bootstrap';

// Assets
import {
  MdUpload, MdLocalShipping, MdWarehouse, MdComputer, MdClear
} from 'react-icons/md';

// Components
import TableFilterUser from '../components/TableFilterUser';
import { TableFilterText, TableFilterRange } from '../components/TableFilterInput';
import TableFilterRadio from '../components/TableFilterRadio';
import TableFilterSelect from '../components/TableFilterSelect';
import TableFilterTime from '../components/TableFilterTime';

import { TableItemIcon } from 'components/common/management/table/tableItem/TableItemComponent';

// Utility
import { getState } from 'utils/helpers/Request';

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

      {/* 
      <Col className='mn-table-item-col' xs={2}>
        <Stack direction='horizontal' gap={2}>
          <TableItemIcon icon={{ icon: MdComputer, tip: 'Điều phối viên' }} />
          <TableFilterUser
            user={filterList[7].state} setUser={filterList[7].setState}
            userType={'director'}
            tip='Lọc Điều phối viên'
          />
          <TableItemIcon icon={{ icon: MdWarehouse, tip: 'Quản lý kho' }} />
          <TableFilterUser
            user={filterList[8].state} setUser={filterList[8].setState}
            userType={'keeper'}
            tip='Lọc Quản lý kho'
          />
          <TableItemIcon icon={{ icon: MdLocalShipping, tip: 'Tình nguyện viên' }} />
          <TableFilterUser
            user={filterList[9].state} setUser={filterList[9].setState}
            userType={'volunteer'}
            tip='Lọc Tình nguyện viên'
          />
          {(filterList[7].state || filterList[8].state || filterList[9].state) &&
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => {
                filterList[7].setState(null);
                filterList[8].setState(null);
                filterList[9].setState(null);
              }}
            >
              <TableItemIcon icon={{ icon: MdClear, tip: 'Bỏ chọn tất cả' }} />
            </div>
          }
        </Stack>
      </Col>
      <Col className='mn-table-item-col' xs={2}>
        <TableFilterTime
          date={filterList[10].state} setDate={filterList[10].setState}
        />
      </Col>
      <Col className='mn-table-item-col' xs={2}>
        <TableFilterTime
          date={filterList[11].state} setDate={filterList[11].setState}
        />
      </Col>
      <Col className='mn-table-item-col' xs={1}>
        <TableFilterRange
          range={filterList[12].state} setRange={filterList[12].setState}
          placeholder='Tất cả'
        />
      </Col> */}
    </>
  );
};

export default TableFilterRequest;
