// Essentials
import React from 'react';
import { Col, Stack } from 'react-bootstrap';

// Assets
import {
  MdUpload, MdLocalShipping, MdWarehouse, MdComputer
} from 'react-icons/md';

// Components
import TableFilterUser from '../components/TableFilterUser';
import { TableFilterText } from '../components/TableFilterInput';
import TableFilterRadio from '../components/TableFilterRadio';

// Utility
import { getState } from 'utils/helpers/Request';

const TableFilterRequest = ({
  filterList
}) => {

  const fromList = [
    { value: ['donor', ''], icon: MdUpload, tip: 'Cho' },
    { value: ['donee', 'delivery'], icon: MdLocalShipping, tip: 'Nhận (Giao hàng)' },
    { value: ['donee', 'pickup'], icon: MdWarehouse, tip: 'Nhận (Tại kho)' }
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
            placeholder='ID'
          />
        </Stack>
      </Col>
      <Col className='mn-table-item-col' xs={1}>
        <TableFilterRadio
          activeRadioValue={filterList[2].state} setActiveRadioValue={filterList[2].setState}
          radioList={fromList}
        />
      </Col>
    </>
  );
};

export default TableFilterRequest;
