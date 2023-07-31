// Essentials
import React from 'react';
import { Stack, Dropdown  } from 'react-bootstrap';

// Components
import DropdownItem from './DropdownItem';

const DropdownList = ({
  activeStatusIdx,
  setActiveStatusIdx,
  statusList,
  getStatusLabel,
  styleList,
  title=undefined,
  style=""
}) => {
  return (
    <>
      <Stack direction='horizontal' gap={2} className={style}>
        {title && <div className='chip-title me-1'>{title}</div>}
        {statusList.length > 0 && 
          <>
            <Dropdown>
              <Dropdown.Toggle id="dropdown-autoclose-true">
                {getStatusLabel(statusList[activeStatusIdx])}
              </Dropdown.Toggle>
              <Dropdown.Menu>
              {statusList.map((status, idx) => (
                <DropdownItem
                  key={idx}
                  status={status}
                  statusIdx={idx}
                  statusList={statusList}
                  isActive={idx === activeStatusIdx}
                  setActiveStatusIdx={setActiveStatusIdx}
                  getStatusLabel={getStatusLabel}
                  styleList={styleList}
                  style={styleList[idx]}
                />
              ))}
              </Dropdown.Menu>
            </Dropdown>
          </>
        }
      </Stack>
    </>
  );
};

export default DropdownList;