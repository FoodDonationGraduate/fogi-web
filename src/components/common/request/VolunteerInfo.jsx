// Essentials
import React, { useState } from 'react';
import { Button, Stack } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

// Components
import ReportModal from 'components/common/request/ReportModal';

// Assets
import { MdPhone } from 'react-icons/md';

// Utility
import { useResizer } from 'utils/helpers/Resizer.jsx';

const VolunteerInfo = ({
  isCard=false,
  volunteerInfo,
  order=undefined
}) => {
  let size = useResizer();
  const navigate = useNavigate(); 
  const [show, setShow] = useState(false);
  const onClose = () => setShow(false);
  const onShow = () => setShow(true);
  
  const userInfo = useSelector(state => state.authenticationReducer.user);
  const userToken = useSelector(state => state.authenticationReducer.token);

  return (
    <>  
      {volunteerInfo &&
        <>
          {order && (
            <ReportModal
              show={show}
              onClose={onClose}
              volunteerInfo={volunteerInfo}
              userInfo={userInfo}
              userToken={userToken}
              order={order}
            />
          )}
    
          <div className={isCard ? `order-item-volunteer-info-card` : (size > 1 ? `order-item-volunteer-info` : '')}>
            {!isCard && size <= 1 && <hr />}
            <Stack direction='horizontal' gap={3}>
              <img src={`https://bachkhoi.online/static/${volunteerInfo.avatar}`} alt='volunteer-avatar'
                className='order-item-volunteer-avatar volunteer-avatar' 
                onClick={() => navigate(`/volunteer/${volunteerInfo.username}`)}/>
              <Stack direction='vertical'>
                <small className='order-item-volunteer-label'>Tình nguyện viên</small>
                <div className='order-item-volunteer-name'>{volunteerInfo.name}</div>
                <small className='order-item-volunteer-label'>
                  <MdPhone /> {volunteerInfo.phone}
                </small>
              </Stack>
              {order &&
                <Button variant='outline-secondary' onClick={onShow}>
                Báo cáo
                </Button>
              }
            </Stack>
          </div>
        </>
      }
    </>
  );
};

export default VolunteerInfo;
