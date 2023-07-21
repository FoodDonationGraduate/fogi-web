// Essentials
import React from 'react';
import { Col, Stack } from 'react-bootstrap';

// Assets
import {
  MdUpload, MdDownload, MdLocalShipping, MdWarehouse, MdComputer
} from 'react-icons/md';

// Components
import TableFilterUser from '../components/TableFilterUser';

// Utility
import { getState } from 'utils/helpers/Request';

const TableFilterRequest = ({
  filterList
}) => {

  return (
    <>
      <Col className='mn-table-item-col' xs={1}>
        <Stack direction='horizontal' gap={2}>
          <TableFilterUser
            user={filterList[0].state} setUser={filterList[0].setState}
            userType={filterList[0].userType}
            tip='Lọc Người dùng'
          />
        </Stack>
      </Col>
    </>
  );
};

export default TableFilterRequest;
