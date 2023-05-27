// Essentials
import React, { useState } from 'react';
import { Button, Stack } from 'react-bootstrap';

// Components
import ReportModal from 'components/common/request/ReportModal';

// Assets
import Avatar from 'assets/images/avatar.png';

// Utility
import { useResizer } from 'utils/helpers/Resizer.jsx';

const VolunteerInfo = ({
  isCard=false
}) => {
  let size = useResizer();

  const [show, setShow] = useState(false);
  const onClose = () => setShow(false);
  const onShow = () => setShow(true);

  // Sample Data
  const volunteerInfo = {
    name: 'Trần Thanh Tùng',
    avatar: Avatar
  };

  return (
    <>
      <ReportModal show={show} onClose={onClose} volunteerInfo={volunteerInfo} />

      <div className={isCard ? `order-item-volunteer-info-card` : (size > 1 ? `order-item-volunteer-info` : '')}>
        {!isCard && size <= 1 && <hr />}
        <Stack direction='horizontal' gap={3}>
          <img src={volunteerInfo.avatar} className='order-item-volunteer-avatar' />
          <Stack direction='vertical'>
            <small className='order-item-volunteer-label'>Tình nguyện viên</small>
            <div className='order-item-volunteer-name'>{volunteerInfo.name}</div>
          </Stack>
          <Button variant='outline-secondary' onClick={onShow}>
            Báo cáo
          </Button>
        </Stack>
      </div>
    </>
  );
};

export default VolunteerInfo;
