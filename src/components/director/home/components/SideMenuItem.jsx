// Essentials
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Stack } from 'react-bootstrap';

// Assets
import {
  MdOutlineAnalytics, // 0
  MdCheckCircleOutline, // 1
  MdOutlineCategory // 2
} from 'react-icons/md';

// Utility
import { useResizer } from 'utils/helpers/Resizer.jsx';

const SideMenuItem = ({
  type,
  isActive,
  setActiveIdx
}) => {
  const [label, setLabel] = useState('');
  const [active, setActive] = useState('');
  let size = useResizer();

  // Handle all the onClick events
  const handleOnClick = () => {
    setActiveIdx(type);
  };

  useEffect(() => {
    switch (type) {
      case 1: setLabel('Xét duyệt'); break;
      case 2: setLabel('Quản lý Phân loại'); break;
      default: setLabel('Thống kê');
    }
  }, []);

  useEffect(() => {
    if (isActive) {
      if (size === 2) setActive('-active-md');
      else setActive('-active');
    }
  });

  useEffect(() => {
    if (isActive) setActive('-active');
    else setActive('');
  }, [isActive]);

  return (
    <>
      {size !== 2 && (
        <div className='mb-2' onClick={handleOnClick}>
          <Stack className={`side-menu-item${active}`} direction='horizontal' gap={4}>
            <Stack direction='horizontal' gap={4}>
              {type === 0 && <MdOutlineAnalytics className={`side-menu-icon${active}`} />}
              {type === 1 && <MdCheckCircleOutline className={`side-menu-icon${active}`} />}
              {type === 2 && <MdOutlineCategory className={`side-menu-icon${active}`} />}

              <header className={`side-menu-label${active}`}>{label}</header>
            </Stack>
            {isActive && (
              <div className='side-menu-tail' />
            )}
          </Stack>
        </div>
      )}
      {size === 2 && (
        <div className='mb-2' onClick={handleOnClick}>
          <Stack className={`side-menu-item${active} align-items-center`} direction='vertical' gap={4}>
            {type === 0 && <MdOutlineAnalytics className={`side-menu-icon${active}`} />}
            {type === 1 && <MdCheckCircleOutline className={`side-menu-icon${active}`} />}
            {type === 2 && <MdOutlineCategory className={`side-menu-icon${active}`} />}
          </Stack>
        </div>
      )}
    </>
  );
};

export default SideMenuItem;