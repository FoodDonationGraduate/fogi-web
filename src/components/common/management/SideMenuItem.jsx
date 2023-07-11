// Essentials
import React, { useState, useEffect }  from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack } from 'react-bootstrap';

// Assets
import {
  MdOutlineAnalytics, // 0
  MdOutlineArticle, // 1
  MdOutlineShoppingBag, // 2
  MdCheckCircleOutline, // 3
  MdOutlineGroup // 4
} from 'react-icons/md';

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
    navigate(`/${userType}/${sideMenuInfo.link}`);
    if ((userType === 'director' && sideMenuInfo.idx === 1)
    || (userType === 'donor' && sideMenuInfo.idx === 2)) {
      localStorage.removeItem('requestAttributes');
    }
  };

  return (
    <>
      {size !== 2 && (
        <div className='mb-2' onClick={handleOnClick}>
          <Stack className={`side-menu-item${style}`} direction='horizontal' gap={4}>
            <Stack direction='horizontal' gap={4}>
              {sideMenuInfo.idx === 0 && <MdOutlineAnalytics className={`side-menu-icon${style}`} />}
              {sideMenuInfo.idx === 1 && <MdOutlineArticle className={`side-menu-icon${style}`} />}
              {sideMenuInfo.idx === 2 && <MdOutlineShoppingBag className={`side-menu-icon${style}`} />}
              {sideMenuInfo.idx === 3 && <MdCheckCircleOutline className={`side-menu-icon${style}`} />}
              {sideMenuInfo.idx === 4 && <MdOutlineGroup className={`side-menu-icon${style}`} />}

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
            {sideMenuInfo.idx === 0 && <MdOutlineAnalytics className={`side-menu-icon${style}`} />}
            {sideMenuInfo.idx === 1 && <MdOutlineArticle className={`side-menu-icon${style}`} />}
            {sideMenuInfo.idx === 2 && <MdOutlineShoppingBag className={`side-menu-icon${style}`} />}
            {sideMenuInfo.idx === 3 && <MdCheckCircleOutline className={`side-menu-icon${style}`} />}
            {sideMenuInfo.idx === 4 && <MdOutlineGroup className={`side-menu-icon${style}`} />}
          </Stack>
        </div>
      )}
    </>
  );
};

export default SideMenuItem;