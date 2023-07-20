// Essentials
import * as React from 'react';
import { Stack } from 'react-bootstrap';

// Components
import SideMenuItem from './SideMenuItem';
import SideMenuUser from './SideMenuUser';

// Styling
import 'assets/css/common/Management.css';

const SideMenu = ({
  activeIdx,
  sideMenuInfoList,
  userType
}) => {

  // let size = useResizer();

  return (
    <>
      <div className='mn-menu'>
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
      </div>
    </>
  );
};

export default SideMenu;