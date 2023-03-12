// Essentials
import * as React from 'react';
import { Col, Row, Stack } from 'react-bootstrap';

// Components
import SideMenuItem from './SideMenuItem';
import DonorItem from './DonorItem';

const SideMenu = ({
  activeIdx,
  setActiveIdx
}) => {

  return (
    <>
      <Col className='side-menu' lg={3}>
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