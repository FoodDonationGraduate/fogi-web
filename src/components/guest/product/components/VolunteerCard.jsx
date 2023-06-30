// Essentials
import React, { useState } from 'react';
import { Stack } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

// Components
import ReportModal from 'components/common/request/ReportModal';

// Assets
import { MdEmail } from 'react-icons/md';

// Utility
import { useResizer } from 'utils/helpers/Resizer.jsx';

const VolunteerCard = ({
  isCard=false,
  volunteerInfo,
  orderId=undefined
}) => {
  let size = useResizer();
  const navigate = useNavigate(); 
  const [show, setShow] = useState(false);
  const onClose = () => setShow(false);

  return (
    <>  
      {volunteerInfo &&
        <>
          {orderId && (
            <ReportModal show={show} onClose={onClose} volunteerInfo={volunteerInfo} orderId={orderId} />
          )}
    
          <div className={isCard ? `order-item-volunteer-info-card` : (size > 1 ? `order-item-volunteer-info` : '')}>
            {!isCard && size <= 1 && <hr />}
            <Stack direction='horizontal' gap={3}>
              <img src={`https://bachkhoi.online/static/${volunteerInfo.avatar}`}  alt='volunteer-avatar'
              className='order-item-volunteer-avatar volunteer-avatar' 
              onClick={() => navigate(`/volunteer/${volunteerInfo.username}`)}/>
              <Stack direction='vertical'>
                <small className='order-item-volunteer-label'>Tình nguyện viên</small>
                <h3>{volunteerInfo.name}</h3>
                <small className='order-item-volunteer-label'>
                  <MdEmail />  {volunteerInfo.email}
                </small>
              </Stack>
            </Stack>
          </div>
        </>
      }
    </>
  );
};

export default VolunteerCard;
