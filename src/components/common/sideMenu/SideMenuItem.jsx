// Essentials
import React  from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack } from 'react-bootstrap';

// Utility
import { useResizer } from 'utils/helpers/Resizer.jsx';

const SideMenuItem = ({
  isActive,
  sideMenuInfo,
  userType
}) => {
  // Constants
  let size = useResizer();
  const navigate = useNavigate();

  // Controls
  const style = isActive ? '-active' + (size === 2 ? '-md' : '') : '';

  // Handle all the onClick events
  const handleOnClick = () => {
    if (isActive) return;
    navigate(`/${userType}/${sideMenuInfo.link}`);
  };

  return (
    <>
      {size !== 2 && (
        <div className='mb-2' onClick={handleOnClick}>
          <Stack className={`side-menu-item${style}`} direction='horizontal' gap={4}>
            <Stack direction='horizontal' gap={3}>
              <sideMenuInfo.icon className={`side-menu-icon${style}`} />

              <header className={`side-menu-label${style}`}>{sideMenuInfo.label}</header>
            </Stack>
            {isActive && (
              <div className='side-menu-tail' />
            )}
          </Stack>
        </div>
      )}
      {size === 2 && (
        <div className='mb-2' onClick={handleOnClick}>
          <Stack className={`side-menu-item${style} align-items-center`} direction='vertical' gap={4}>
            <sideMenuInfo.icon className={`side-menu-icon${style}`} />
          </Stack>
        </div>
      )}
    </>
  );
};

export default SideMenuItem;