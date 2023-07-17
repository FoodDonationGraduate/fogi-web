// Essentials
import React from 'react';
import { ButtonGroup, Dropdown, Stack } from 'react-bootstrap';

// Components
import SortByButton from './SortByButton';

// Styling
import 'assets/css/common/Search.css';

const CompactDropdown = ({
  activeIdx, setActiveIdx,
  list, // = [ { value, label }, { value, label }, ... ]
  sortBy, setSortBy,
  title=undefined
}) => {

  const onSelect = (eventKey, _) => {
    setActiveIdx(eventKey);
  };

  return (
    <>
      <Stack direction='horizontal' gap={2}>
        {title && <div className='chip-title me-1'>{title}</div>}
        {list.length > 0 &&
          <Dropdown as={ButtonGroup} onSelect={onSelect}>
            <Dropdown.Toggle
              className='fogi compact-dropdown'
              variant='primary'
            >
              {list[activeIdx].label}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {list.map((item, idx) => (
                <Dropdown.Item key={idx} eventKey={idx}>
                  {item.label}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>

            <div className='compact-separator' />

            <SortByButton sortBy={sortBy} setSortBy={setSortBy} />
          </Dropdown>
        }
      </Stack>
    </>
  )
};

export default CompactDropdown;
