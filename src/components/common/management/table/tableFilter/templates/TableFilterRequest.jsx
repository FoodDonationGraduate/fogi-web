// Essentials
import React from 'react';
import { Col, Stack } from 'react-bootstrap';

// Assets
import {
  MdUpload, MdLocalShipping, MdWarehouse, MdComputer
} from 'react-icons/md';

// Components
import TableFilterUser from '../components/TableFilterUser';
import { TableFilterText, TableFilterRange } from '../components/TableFilterInput';
import TableFilterRadio from '../components/TableFilterRadio';
import TableFilterSelect from '../components/TableFilterSelect';

// Utility
import { getState } from 'utils/helpers/Request';

const TableFilterRequest = ({
  filterList
}) => {

  // Constants
  const fromList = [
    { value: ['donor', ''], icon: MdUpload, tip: 'Cho' },
    { value: ['donee', 'delivery'], icon: MdLocalShipping, tip: 'Nhận (Giao hàng)' },
    { value: ['donee', 'pickup'], icon: MdWarehouse, tip: 'Nhận (Tại kho)' }
  ];

  const statusList = [
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
      <Col className='mn-table-item-col' xs={1}>
        <TableFilterRadio
          activeRadioValue={filterList[2].state} setActiveRadioValue={filterList[2].setState}
          radioList={fromList}
        />
      </Col>
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
    </>
  );
};

export default TableFilterRequest;
