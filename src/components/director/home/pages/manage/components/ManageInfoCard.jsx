// Essentials
import React, { useState, useEffect } from 'react';
import { Button, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

// Style
import 'assets/css/director/HomePage.css';

// Reducers
import { lockUser, approveUser } from 'components/redux/reducer/DirectorReducer.jsx';
import { retrieveCurrentUser } from 'components/redux/reducer/DirectorReducer';

// Utility
import { useResizer } from 'utils/helpers/Resizer.jsx';

// Assets
import {
  MdMailOutline,
  MdOutlinePhone
} from 'react-icons/md';

const getUserType = (user_type) => {
  switch (user_type) {
    case 'donee': return 'Người nhận';
    case 'donor': return 'Người quyên góp';
    default: return 'Tình nguyện viên';
  }
};

const ManageInfoCard = ({
  user,
  userInfo,
  userToken
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(state => state.directorReducer.currentUser)

  let size = useResizer();

  const handleLock = (isLock) => {
    dispatch(lockUser(
      {
        user_email: user.email,
        user_type: user.user_type,
        isLock
      }, {
        userInfo,
        userToken
      },
      navigate
    ));
  };

  const handleApprove = (isApprove) => {
    dispatch(approveUser(
      {
        user_email: user.email,
        action: isApprove ? 'approve' : 'decline',
      }, {
        userInfo,
        userToken
      },
      navigate
    ));

  };

  useEffect(() => {
    dispatch(retrieveCurrentUser({
      user_email: user.email
    }, {
      userInfo: userInfo,
      userToken: userToken
    },
    navigate));
  }, [])

  return (
    <>
    {
      (currentUser && currentUser.user) &&
      <div className='manage-card'>
        <Stack direction='horizontal' gap={4}>
          <img className='manage-details-profile-logo' src={`https://bachkhoi.online/static/${currentUser.user.avatar}`} alt='director logo'/>
          <Stack direction='vertical' gap={2}>
            <Stack direction='horizontal' gap={3}>
              <h3 className='manage-card-name fw-bold'>
                {currentUser.user.name}
              </h3>
              <span className={`mb-1 ${size > 0 ? 'long-product-type' : 'long-product-type-sm'}`}>
                {getUserType(currentUser.user.user_type)}
              </span>
            </Stack>
            <header className='manage-card-secondary'>
              <Stack direction='horizontal' gap={2}>
                <MdMailOutline />
                {currentUser.user.email}
              </Stack>
            </header>
            <header className='manage-card-secondary'>
              <Stack direction='horizontal' gap={2}>
                <MdOutlinePhone />
                {currentUser.user.phone}
              </Stack>
            </header>
          </Stack>
        </Stack>

        <hr />
        <Stack direction='horizontal' gap={4}>
          {!currentUser.user.is_locked ? 
            <Button variant='outline-danger' onClick={() => handleLock(true)}>
              Khóa tài khoản
            </Button>
            :
            <Button variant='outline-secondary' onClick={() => handleLock(false)}>
              Mở khóa tài khoản
            </Button>
          }
          {!currentUser.user.is_approved ? 
            <Button variant='outline-secondary' onClick={() => handleApprove(true)}>
              Chấp thuận người dùng
            </Button>
            :
            <Button variant='outline-warning' onClick={() => handleApprove(false)}>
              Hạn chế người dùng
            </Button>
          }
        </Stack>
        
      </div>
    }
    </>
  );
};

export default ManageInfoCard;
