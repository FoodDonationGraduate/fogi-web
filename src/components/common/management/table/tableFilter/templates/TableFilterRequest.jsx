// Essentials
import React from 'react';
import { useSelector } from 'react-redux';
import { Col, Stack } from 'react-bootstrap';

// Assets
import {
  MdLocalShipping, MdWarehouse, MdComputer, MdClear
} from 'react-icons/md';

// Components
import TableFilterUser from '../components/TableFilterUser';
import { TableFilterText, TableFilterRange } from '../components/TableFilterInput';
import TableFilterSelect from '../components/TableFilterSelect';
import TableFilterTime from '../components/TableFilterTime';

import { TableItemIcon } from 'components/common/management/table/tableItem/TableItemComponent';

const TableFilterRequest = ({
  filterList
}) => {
  const userInfo = useSelector(state => state.authenticationReducer.user);

  // Constants
  // const fromList = [
  //   { value: ['donor', ''], icon: MdUpload, tip: 'Cho' },
  //   { value: ['donee', 'delivery'], icon: MdLocalShipping, tip: 'Nhận (Giao hàng)' },
  //   { value: ['donee', 'pickup'], icon: MdWarehouse, tip: 'Nhận (Tại kho)' }
  // ];

  const statusList = userInfo.user_type === 'warehouse_keeper' ? [
    {
      from: 'donor', delivery_type: '',
      statusList: [
        { value: '', label: 'Tất cả' },
        { value: 'shipping', label: 'Đang giao' },
        { value: 'success', label: 'Thành công' },
        { value: 'canceled', label: 'Đã hủy' }
      ]
    },
    {
      from: 'donee', delivery_type: 'delivery',
      statusList: [
        { value: '', label: 'Tất cả' },
        { value: 'receiving', label: 'Đang nhận' },
        { value: 'shipping', label: 'Đang giao' },
        { value: 'success', label: 'Thành công' },
        { value: 'canceled', label: 'Đã hủy' }
      ]
    },
    {
      from: 'donee', delivery_type: 'pickup',
      statusList: [
        { value: '', label: 'Tất cả' },
        { value: 'accepted', label: 'Đã xác nhận' },
        { value: 'receiving', label: 'Đang nhận' },
        { value: 'success', label: 'Thành công' },
        { value: 'canceled', label: 'Đã hủy' }
      ]
    }
  ] : [
    {
      from: 'donor', delivery_type: '',
      statusList: [
        { value: '', label: 'Tất cả' },
        { value: 'pending', label: 'Chờ duyệt' },
        { value: 'finding', label: 'Đang điều phối' },
        { value: 'receiving', label: 'Đang nhận' },
        { value: 'shipping', label: 'Đang giao' },
        { value: 'success', label: 'Thành công' },
        { value: 'canceled', label: 'Đã hủy' }
      ]
    },
    {
      from: 'donee', delivery_type: 'delivery',
      statusList: [
        { value: '', label: 'Tất cả' },
        { value: 'pending', label: 'Chờ duyệt' },
        { value: 'finding', label: 'Đang điều phối' },
        { value: 'receiving', label: 'Đang nhận' },
        { value: 'shipping', label: 'Đang giao' },
        { value: 'success', label: 'Thành công' },
        { value: 'canceled', label: 'Đã hủy' }
      ]
    },
    {
      from: 'donee', delivery_type: 'pickup',
      statusList: [
        { value: '', label: 'Tất cả' },
        { value: 'pending', label: 'Chờ duyệt' },
        { value: 'accepted', label: 'Đã xác nhận' },
        { value: 'receiving', label: 'Đang nhận' },
        { value: 'success', label: 'Thành công' },
        { value: 'canceled', label: 'Đã hủy' }
      ]
    }
  ];

  return (
    <>
      <Col className='mn-table-item-col' xs={1}>
        <Stack direction='horizontal' gap={2}>
          <TableFilterUser
            user={filterList[0].state} setUser={filterList[0].setState}
            userType={filterList[2].state[0]}
            tip='Lọc Người dùng'
          />
          <TableFilterText
            input={filterList[1].state} setInput={filterList[1].setState}
            placeholder='ID' type='int'
          />
        </Stack>
      </Col>
      {/* <Col className='mn-table-item-col' xs={1}>
        <TableFilterRadio
          activeRadioValue={filterList[2].state} setActiveRadioValue={filterList[2].setState}
          radioList={fromList}
        />
      </Col> */}
      <Col className='mn-table-item-col' xs={1}>
        <TableFilterSelect
          activeOption={filterList[3].state} setActiveOption={filterList[3].setState}
          optionList={statusList.find(list => list.from === filterList[2].state[0] && list.delivery_type === filterList[2].state[1]).statusList}
        />
      </Col>
      <Col className='mn-table-item-col' xs={1}>
        <TableFilterRange
          range={filterList[4].state} setRange={filterList[4].setState}
          placeholder='Tất cả'
        />
      </Col>
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
            userType={'warehouse_keeper'}
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
      </Col>
    </>
  );
};

export default TableFilterRequest;
