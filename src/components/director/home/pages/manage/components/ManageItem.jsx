// Essentials
import React from 'react';
import { Stack } from 'react-bootstrap';
import { EqualHeightElement } from 'react-equal-height';

// Style
import 'assets/css/director/HomePage.css';

// Assets
import {
  MdMailOutline,
  MdOutlinePhone,
  MdOutlineReportProblem
} from 'react-icons/md';

const ManageItem = ({
  user
}) => {

  return (
    <>
      <div className='manage-card manage-clickable'>
        <EqualHeightElement name='manage-content'>
          <Stack className='mb-2' direction='horizontal' gap={4}>
            <img className='profile-logo-sm' src={`https://bachkhoi.online/static/${user.avatar}`} alt='director logo'/>
            <h4 className='manage-card-name'>
              {user.name}
            </h4>
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

          <header className='manage-card-secondary'>
            <Stack direction='horizontal' gap={2}>
              <MdOutlineReportProblem />
              {user.num_of_report}
            </Stack>
          </header>
        </EqualHeightElement>
      </div>
    </>
  );
};

export default ManageItem;
