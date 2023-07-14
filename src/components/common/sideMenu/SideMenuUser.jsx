// Essentials
import React from 'react';
import { Stack } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

// Utility
import { useResizer } from 'utils/helpers/Resizer.jsx';

const SideMenuUser = () => {
  const userInfo = useSelector(state => state.authenticationReducer.user);

  const navigate = useNavigate();
  const toProfilePage = () => { navigate('/profile'); };
  
  let size = useResizer();
    
  const date = new Date();

  return (
    <>
      {size !== 2 && (
        <div className='side-menu-profile-item' onClick={toProfilePage}>
          <Stack direction='horizontal' gap={3}>
            <img className='profile-logo-sm' src={`https://bachkhoi.online/static/${userInfo.avatar}?${date.getTime()}`} alt='director logo'/>
            <header className='fw-bold'>{userInfo.name}</header>
          </Stack>
        </div>
      )}
      {size === 2 && (
        <Stack className='side-menu-profile-item align-items-center' direction='vertical'>
          <img className='profile-logo-sm' src={`https://bachkhoi.online/static/${userInfo.avatar}?${date.getTime()}`} alt='donor logo'/>
        </Stack>
      )}
    </>
  );
};

export default SideMenuUser;