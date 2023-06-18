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
  MdOutlineReport
} from 'react-icons/md';

const ManageItem = ({
  user
}) => {

  return (
    <>
      <div className='approve-card' id='approve-card'>
        <EqualHeightElement name='approve-content'>
          <h4 className='approve-card-name'>
            {user.name}
          </h4>
      
          <header className='approve-card-secondary'>
            <Stack direction='horizontal' gap={2}>
              <MdMailOutline />
              {user.email}
            </Stack>
          </header>

          <header className='approve-card-secondary'>
            <Stack direction='horizontal' gap={2}>
              <MdOutlinePhone />
              {user.phone}
            </Stack>
          </header>

          <header className='approve-card-secondary'>
            <Stack direction='horizontal' gap={2}>
              <MdOutlineReport />
              {user.num_of_report}
            </Stack>
          </header>
        </EqualHeightElement>
      </div>
    </>
  );
};

export default ManageItem;
