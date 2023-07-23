// Essentials
import React  from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SideMenuItem = ({
  isActive,
  sideMenuInfo,
  userType
}) => {
  // Constants
  const navigate = useNavigate();

  // Controls
  const style = isActive ? '-active' : '';

  // Handle all the onClick events
  const handleOnClick = () => {
    if (isActive) return;
    navigate(`/${userType}/${sideMenuInfo.link}`);
  };

  return (
    <>
      <OverlayTrigger
        placement='right'
        overlay={
          <Tooltip style={{ position: 'fixed' }}>
            {sideMenuInfo.label}
          </Tooltip>
        }
      >
        <div className={`mn-menu-item${style} mb-2`} onClick={handleOnClick}>
          <sideMenuInfo.icon className={`mn-menu-icon${style}`} />
        </div>
      </OverlayTrigger>
    </>
  );
};

export default SideMenuItem;