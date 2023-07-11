// Essentials
import * as React from 'react';
import { Col, Stack } from 'react-bootstrap';

// Components
import SideMenuItem from './SideMenuItem';
import SideMenuUser from './SideMenuUser';

const SideMenu = ({
  activeIdx,
  sideMenuInfoList,
  userType
}) => {

  // let size = useResizer();

  return (
    <>
      <Col className='side-menu' md={2} lg={3}>
        <SideMenuUser className='mb-4' />

        <Stack className='mt-4' direction='vertical'>
          {sideMenuInfoList.length > 0 && sideMenuInfoList.map((sideMenuInfo, idx) => (
            <SideMenuItem
              key={idx}
              isActive={activeIdx === sideMenuInfo.idx}
              sideMenuInfo={sideMenuInfo}
              userType={userType}
            />
          ))}
        </Stack>
      </Col>
    </>
  );
};

export default SideMenu;