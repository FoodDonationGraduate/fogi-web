// Essentials
import React from 'react';
import { Button, Stack } from 'react-bootstrap';

import { useSelector } from 'react-redux'

// Style
import 'assets/css/director/HomePage.css';

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
  user
}) => {
  const user_type = useSelector(state => state.directorReducer.user_type);
  let size = useResizer();

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

        <Stack direction='horizontal' gap={2}>
          <Button variant='outline-danger'>
            Khóa tài khoản
          </Button>
        </Stack>
      </div>
    </>
  );
};

export default ManageInfoCard;
