// Essentials
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Stack } from 'react-bootstrap';

// Assets
import {
  MdOutlineAnalytics, // 0
  MdOutlineFastfood, // 1
  MdOutlineAssignment, // 2
  MdOutlineNotifications, // 3
  MdOutlineAccountCircle, // 4
  MdOutlineSettings, // 5
  MdExitToApp, // 6
} from 'react-icons/md';

const SideMenuItem = ({
  type,
  isActive,
  setActiveIdx
}) => {
  const [label, setLabel] = useState('');
  const [active, setActive] = useState('');

  // Handle all the onClick events
  const handleOnClick = () => {
    if (type !== 6) setActiveIdx(type);
  };

  useEffect(() => {
    switch (type) {
      case 1: setLabel('Products'); break;
      case 2: setLabel('Orders'); break;
      case 3: setLabel('Notifications'); break;
      case 4: setLabel('Profile'); break;
      case 5: setLabel('Settings'); break;
      case 6: setLabel('Logout'); break;
      default: setLabel('Dashboard');
    }
  }, []);

  useEffect(() => {
    if (isActive) setActive('-active');
    else setActive('');
  }, [isActive]);

  return (
    <div onClick={handleOnClick}>
      <Stack className={`side-menu-item${active}`} direction='horizontal' gap={4}>
        <Stack direction='horizontal' gap={4}>
          {type === 0 && <MdOutlineAnalytics className={`side-menu-icon${active}`} />}
          {type === 1 && <MdOutlineFastfood className={`side-menu-icon${active}`} />}
          {type === 2 && <MdOutlineAssignment className={`side-menu-icon${active}`} />}
          {type === 3 && <MdOutlineNotifications className={`side-menu-icon${active}`} />}
          {type === 4 && <MdOutlineAccountCircle className={`side-menu-icon${active}`} />}
          {type === 5 && <MdOutlineSettings className={`side-menu-icon${active}`} />}
          {type === 6 && <MdExitToApp className={`side-menu-icon${active}`} />}

          <header className={`side-menu-label${active}`}>{label}</header>
        </Stack>
        {isActive && <div className='side-menu-tail' />}
      </Stack>
    </div>
  );
};

export default SideMenuItem;