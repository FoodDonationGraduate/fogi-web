// Essentials
import * as React from 'react';
import { Col, Stack } from 'react-bootstrap';

// Components
import SideMenuItem from './SideMenuItem';
import DonorItem from './DonorItem';

const SideMenu = ({
  activeIdx,
  setActiveIdx
}) => {

  // let size = useResizer();

  return (
    <>
      <Col className='side-menu' md={2} lg={3}>
        <DonorItem className='mb-4' />
        
        <Stack className='mt-4' direction='vertical'>
          {Array.from({ length: 3 }).map((_, idx) => (
            <SideMenuItem
              key={idx}
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