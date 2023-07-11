// Essentials
import React, { useState } from 'react';
import { Container, Row, Stack } from 'react-bootstrap';

// Components
import ChipList from 'components/common/chip/ChipList';

import RequestList from './components/RequestList';

const RequestListPage = () => {
  // Request attributes
  const requestAttributes = JSON.parse(localStorage.getItem('requestAttributes'));

  // Chip List - Request type
  const [activeFromIdx, setActiveFromIdx] = useState((requestAttributes && requestAttributes.from === 'donee') ? 1 : 0);
  const typeList = ['donor', 'donee'];
  const getTypeLabel = (status) => {
    switch (status) {
      case 'donee': return 'Nhận';
      default: return 'Cho';
    }
  };
  const typeStyleList = ['success', 'success'];

  // Chip List - Request status
  const statusList = ['pending', 'accepted', 'finding', 'receiving', 'shipping', 'success', 'canceled'];
  const [activeStatusIdx, setActiveStatusIdx] = useState(requestAttributes ? statusList.indexOf(requestAttributes.status) : 0);
  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending':
        return 'Chờ duyệt';
      case 'accepted':
        return 'Chấp nhận';
      case 'finding':
        return 'Đang tìm';
      case 'receiving':
        return 'Đang nhận';
      case 'shipping':
        return 'Đang giao';
      case 'canceled':
        return 'Đã hủy';
      default:
        return 'Thành công';
    }
  };
  const styleList = ['neutral', 'info', 'info', 'warning', 'warning', 'success', 'danger'];

  return (
    <>
      <Container>
        <Row className='mb-4'>
          {/* --- Top Section --- */}
          <Stack direction='horizontal' className='mb-4' gap={3}>
            <h2 className='fw-bold'>Quản lý Yêu cầu</h2>
            <ChipList
              activeStatusIdx={activeFromIdx}
              setActiveStatusIdx={setActiveFromIdx}
              statusList={typeList}
              getStatusLabel={getTypeLabel}
              styleList={typeStyleList}
            />
          </Stack>
          <ChipList
            activeStatusIdx={activeStatusIdx}
            setActiveStatusIdx={setActiveStatusIdx}
            statusList={statusList}
            getStatusLabel={getStatusLabel}
            styleList={styleList}
            title={'Trạng thái'}
          />
        </Row>

        {/* --- Request List --- */}
        <div>
          <RequestList
            currentFrom={typeList[activeFromIdx]}
            currentStatus={statusList[activeStatusIdx]}
          />
        </div>

      </Container>
    </>
  )
};

export default RequestListPage;
