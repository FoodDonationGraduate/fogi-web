// Essentials
import React, { useState } from 'react';
import { Col, Row, Stack } from 'react-bootstrap';

// Components
import ChipList from 'components/common/chip/ChipList';

// Styling
import 'assets/css/Fogi.css';

const DashboardTitle = ({ title }) => {
  // Chip List
  const [activeStatusIdx, setActiveStatusIdx] = useState(0);
  const statusList = ['month', 'day'];
  const getStatusLabel = (status) => {
    switch (status) {
      case 'day':
        return '6 ngày';
      default:
        return '6 tháng';
    }
  };
  const styleList = ['success', 'success'];

  return (
    <Row className='mb-3'>
      <div className='px-0 d-flex justify-content-between'>
        <h2 className='fw-bold'>{title}</h2>
        <Stack direction='horizontal' gap={3}>
          <ChipList
            activeStatusIdx={activeStatusIdx}
            setActiveStatusIdx={setActiveStatusIdx}
            statusList={statusList}
            getStatusLabel={getStatusLabel}
            styleList={styleList}
            title={'Thời gian'}
          />
        </Stack>
      </div>
    </Row>
  );
};

export default DashboardTitle;
