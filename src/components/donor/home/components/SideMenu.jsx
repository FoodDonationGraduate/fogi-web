// Essentials
import * as React from 'react';
import { Col, Row, Stack } from 'react-bootstrap';

// Components
import SideMenuItem from './SideMenuItem';

// Asset
import DonorLogo from 'assets/images/DonorLogo.jpg'; // temporary

const SideMenu = ({
  activeIdx,
  setActiveIdx
}) => {

  return (
    <>
      <Col className='side-menu' lg={3}>
        <Row className='mb-4'>
          <Col className='ps-0' md={3} lg={3}>
            <img className='donor-logo-sm' src={DonorLogo} />
          </Col>
          <Col>
            <h5 className='fw-bold ms-2'>
              AP Store
            </h5>
          </Col>
        </Row>
        <Stack direction='vertical'>
          {Array.from({ length: 4 }).map((_, idx) => (
            <SideMenuItem
              type={idx}
              isActive={idx === activeIdx}
              setActiveIdx={setActiveIdx}
            />
          ))}
        </Stack>
        <hr className='my-2' />
        <Stack direction='vertical'>
          {Array.from({ length: 3 }).map((_, idx) => (
            <SideMenuItem
              type={idx + 4}
              isActive={idx + 4 === activeIdx}
              setActiveIdx={setActiveIdx}
            />
          ))}
        </Stack>
      </Col>
    </>
  );
};

export default SideMenu;