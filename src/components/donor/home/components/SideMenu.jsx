// Essentials
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Col, Stack } from 'react-bootstrap';

// Components
import SideMenuItem from './SideMenuItem';
import DonorItem from './DonorItem';

const SideMenu = ({
  activeIdx,
  setActiveIdx
}) => {

  const [_, setSize] = useState(2);
  const handleResize = () => {
    if (window.innerWidth < 992) {
      setSize(1);
    } else {
      setSize(2);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  });

  return (
    <>
      <Col className='side-menu' md={2} lg={3}>
        <DonorItem className='mb-4' />
        
        <Stack className='mt-4' direction='vertical'>
          {Array.from({ length: 4 }).map((_, idx) => (
            <SideMenuItem
              type={idx}
              isActive={idx === activeIdx}
              setActiveIdx={setActiveIdx}
            />
          ))}
        </Stack>
      </Col>
    </>
  );
};

export default SideMenu;