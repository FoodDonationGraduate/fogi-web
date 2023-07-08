// Essentials
import React, { useState } from 'react';
import { Button, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

// Style
import 'assets/css/director/HomePage.css';

// Reducers
import { lockUser, approveUser } from 'components/redux/reducer/DirectorReducer.jsx';

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
    case 'donor': return 'Người cho';
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
  const user_type = useSelector(state => state.directorReducer.user_type);
  let size = useResizer();

  // Lock handling
  const [isLocked, setIsLocked] = useState(user.is_locked);
  const [isApproved, setIsApproved] = useState(user.is_approved);

  const handleLock = (isLock) => {
    dispatch(lockUser(
      {
        user_email: user.email,
        user_type: user.user_type,
        isLock,
        setIsLocked
      }, {
        userInfo,
        userToken
      },
      navigate
    ));
  };

  const handleApprove = (isApprove) => {
    var result =dispatch(approveUser(
      {
        email: user.email,
        action: isApprove ? 'approve' : 'decline',
      }, {
        userInfo,
        userToken
      },
      navigate
    ));
    if (result) {
      setIsApproved(isApprove);
    }
  };

  return (
    <>
      <div className='manage-card'>
        <Stack direction='horizontal' gap={4}>
          <img className='manage-details-profile-logo' src={`https://bachkhoi.online/static/${user.avatar}`} alt='director logo'/>
          <Stack direction='vertical' gap={2}>
            <Stack direction='horizontal' gap={3}>
              <h3 className='manage-card-name fw-bold'>
                {user.name}
              </h3>
              <span className={`mb-1 ${size > 0 ? 'long-product-type' : 'long-product-type-sm'}`}>
                {getUserType(user_type)}
              </span>
            </Stack>
            <header className='manage-card-secondary'>
              <Stack direction='horizontal' gap={2}>
                <MdMailOutline />
                {user.email}
              </Stack>
            </header>
            <header className='manage-card-secondary'>
              <Stack direction='horizontal' gap={2}>
                <MdOutlinePhone />
                {user.phone}
              </Stack>
            </header>
          </Stack>
        </Stack>

        <hr />
        <Stack direction='horizontal' gap={4}>
          {!isLocked ? 
            <Button variant='outline-danger' onClick={() => handleLock(true)}>
              Khóa tài khoản
            </Button>
            :
            <Button variant='outline-secondary' onClick={() => handleLock(false)}>
              Mở khóa tài khoản
            </Button>
          }
          {!isApproved ? 
            <Button variant='outline-secondary' onClick={() => handleApprove(true)}>
              Chấp thuận người dùng
            </Button>
            :
            <Button variant='outline-secondary' onClick={() => handleApprove(false)}>
              Hạn chế người dùng
            </Button>
          }
        </Stack>
        
      </div>
    </>
  );
};

export default ManageInfoCard;
