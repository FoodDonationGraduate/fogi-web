// Essentials
import React from 'react';
import { Row, Stack } from 'react-bootstrap';

// Components
import ChipList from 'components/common/chip/ChipList';

// Styling
import 'assets/css/Fogi.css';

const DashboardTitle = ({
  title,
  activeTimeIdx,
  setActiveTimeIdx,
  timeList,
  getTimeLabel,
  timeStyleList
}) => {

  return (
    <Row className='mb-3'>
      <div className='px-0 d-flex justify-content-between'>
        <h2 className='fw-bold'>{title}</h2>
        <Stack direction='horizontal' gap={3}>
          <ChipList
            activeStatusIdx={activeTimeIdx}
            setActiveStatusIdx={setActiveTimeIdx}
            statusList={timeList}
            getStatusLabel={getTimeLabel}
            styleList={timeStyleList}
            title={'Thời gian'}
          />
        </Stack>
      </div>
    </Row>
  );
};

export default DashboardTitle;
