// Essentials
import * as React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

// Assets imports
import { FaExclamationCircle } from 'react-icons/fa';

const FogiTooltip = ({
  tip,
  placement='right'
}) => {
  const tooltip = (props) => (
    <Tooltip {...props}>{tip}</Tooltip>
  );

  return (
    <>
      <OverlayTrigger
        placement={placement}
        overlay={tooltip}
      >
        <span>
          <FaExclamationCircle className='mb-1' style={{ color: '#82CD47' }} />
        </span>
      </OverlayTrigger>
    </>
  );
};

export default FogiTooltip;
