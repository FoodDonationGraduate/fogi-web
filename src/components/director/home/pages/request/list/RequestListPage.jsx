// Essentials
import React, { useState } from 'react';
import { Container, Row, Stack } from 'react-bootstrap';

// Components
import ChipList from 'components/common/chip/ChipList';
import ListTitle from 'components/common/ListTitle';

import RequestList from './components/RequestList';

const RequestListPage = () => {

  // Chip List - Request type
  const [activeTypeIdx, setActiveTypeIdx] = useState(0);
  const typeList = ['give', 'take'];
  const getTypeLabel = (status) => {
    switch (status) {
      case 'take': return 'Nhận';
      default: return 'Cho';
    }
  };
  const typeStyleList = ['success', 'success'];

  // Chip List - Request status
  const [activeStatusIdx, setActiveStatusIdx] = useState(0);
  const statusList = ['pending', 'finding', 'receiving', 'shipping', 'success', 'cancel'];
  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending': return 'Chờ duyệt';
      case 'finding': return 'Tìm TNV';
      case 'receiving': return 'Đang nhận';
      case 'shipping': return 'Đang giao';
      case 'cancel': return 'Đã hủy';
      default: return 'Thành công';
    }
  };
  const styleList = ['neutral', 'info', 'warning', 'warning', 'success', 'danger'];

  return (
    <>
      <Container>
        <Row className='mb-4'>
          {/* --- Top Section --- */}
          <Stack direction='horizontal' className='mb-4' gap={3}>
            <h2 className='fw-bold'>Quản lý Yêu cầu</h2>
            <ChipList
              activeStatusIdx={activeTypeIdx}
              setActiveStatusIdx={setActiveTypeIdx}
              statusList={typeList}
              getStatusLabel={getTypeLabel}
              styleList={typeStyleList}s
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
            currentType={typeList[activeTypeIdx]}
            currentStatus={statusList[activeStatusIdx]}
          />
        </div>

      </Container>
    </>
  )
};

export default RequestListPage;
