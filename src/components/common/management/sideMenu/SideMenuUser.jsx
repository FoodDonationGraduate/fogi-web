// Essentials
import React from 'react';
import { Stack } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

// Utility
import { useResizer } from 'utils/helpers/Resizer.jsx';
import Notification from 'components/layout/Notification';

const SideMenuUser = () => {
  const userInfo = useSelector(state => state.authenticationReducer.user);

  const navigate = useNavigate();
  const toProfilePage = () => { navigate('/profile'); };
  
  let size = useResizer();
    
  const date = new Date();
  
  return (
    <>
      <div className='mn-menu-profile' onClick={toProfilePage}>
        <img className='mn-menu-profile-avatar' src={`https://bachkhoi.online/static/${userInfo.avatar}?${date.getTime()}`} alt='director logo'/>
      </div>
    </>
  );
};

export default SideMenuUser;
