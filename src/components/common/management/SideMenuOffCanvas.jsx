// Essentials
import * as React from 'react';
import { Offcanvas } from 'react-bootstrap';

// Components
import SideMenu from './SideMenu';

// Utility
import { useResizer } from 'utils/helpers/Resizer.jsx';

const SideMenuOffCanvas = ({
  activeIdx,
  show, onHide,
  sideMenuInfoList,
  userType
}) => {

  let size = useResizer();

  return (
    <>
      {size < 2 && (
        <Offcanvas show={show} onHide={onHide}>
          <Offcanvas.Header closeButton>
            <h4 className='fw-bold'>Menu</h4>
          </Offcanvas.Header>
          <SideMenu 
            activeIdx={activeIdx}
            sideMenuInfoList={sideMenuInfoList}
            userType={userType}
          />
        </Offcanvas>
      )}
    </>
  );
};

export default SideMenuOffCanvas;
