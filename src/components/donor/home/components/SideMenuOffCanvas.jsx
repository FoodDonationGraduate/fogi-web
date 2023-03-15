// Essentials
import * as React from 'react';
import { Offcanvas } from 'react-bootstrap';

// Components
import SideMenu from './SideMenu';

// Utility
import { useResizer } from 'utils/helpers/Resizer.jsx';

const SideMenuOffCanvas = ({
  activeIdx,
  setActiveIdx,
  show,
  handleClose
}) => {

  let size = useResizer();

  return (
    <>
      {size < 2 && (
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <h4 className='fw-bold'>Menu</h4>
          </Offcanvas.Header>
          <SideMenu 
            activeIdx={activeIdx}
            setActiveIdx={setActiveIdx}
          />
        </Offcanvas>
      )}
    </>
  );
};

export default SideMenuOffCanvas;
