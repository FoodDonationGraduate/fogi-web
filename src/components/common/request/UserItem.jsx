// Essentials
import React from 'react';
import { Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const UserItem = ({
  user,
  user_type='volunteer'
}) => {
  const navigate = useNavigate();

  const toVolunteerPage = () => {
    if (user_type === 'volunteer') navigate(`/volunteer/${user.username}`);
  };

  const getUserTypeLabel = () => {
    switch (user_type) {
      case 'donee': return 'Người nhận';
      case 'donor': return 'Người cho';
      default: return 'Tình nguyện viên';
    }
  };

  return (
    <>
      {user ? 
        <>
          <Stack direction='horizontal' gap={2}>
            <img
              src={`https://bachkhoi.online/static/${user.avatar}`}
              alt='volunteer-avatar'
              className='order-item-volunteer-avatar-m volunteer-avatar'
              onClick={toVolunteerPage}
            />
            <Stack direction='vertical' className='justify-content-center'>
              <small className='order-item-volunteer-label'>
                {getUserTypeLabel()}
              </small>
              <div className='order-item-volunteer-name'>{user.name}</div>
            </Stack>
          </Stack>
        </>
        :
        <div className='text-center h-100'>
          <small className='order-item-volunteer-label'>Chưa có {getUserTypeLabel()}</small>
        </div>
      }
    </>
  )
};

export default UserItem;
