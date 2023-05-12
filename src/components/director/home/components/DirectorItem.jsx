// Essentials
import React from 'react';
import { Stack } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

// Asset
import DirectorAvatar from 'assets/images/UserAvatar.png';

// Utility
import { useResizer } from 'utils/helpers/Resizer.jsx';

const DirectorItem = () => {
  const navigate = useNavigate();
  
  let size = useResizer();

  return (
    <>
      {size !== 2 && (
        <div className='side-menu-profile-item'>
          <Stack direction='horizontal' gap={4}>
            <img className='profile-logo-sm' src={DirectorAvatar} alt='director logo'/>
            <h5 className='fw-bold'>Director Name</h5>
          </Stack>
        </div>
      )}
      {size === 2 && (
        <Stack className='side-menu-profile-item align-items-center' direction='vertical'>
          <img className='profile-logo-sm' src={DirectorAvatar} alt='donor logo'/>
        </Stack>
      )}
    </>
  );
};

export default DirectorItem;
