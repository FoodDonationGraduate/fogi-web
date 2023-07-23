// Essentials
import React from 'react';
import { OverlayTrigger, Stack, Tooltip } from 'react-bootstrap';

export const TableFilterIcon = ({
  radio,
  isActive,
  setActiveRadioValue
}) => {
  const onClick = () => {
    setActiveRadioValue(radio.value);
  };

  return (<>
    <OverlayTrigger
      placement='top'
      overlay={
        <Tooltip style={{ position: 'fixed' }}>{radio.tip}</Tooltip>
      }
    >
      <div className='d-flex align-items-center' onClick={onClick}>
        <radio.icon className={`mn-table-filter-icon${isActive ? '-active' : ''}`} />
      </div>
    </OverlayTrigger>
  </>);
};

const TableFilterRadio = ({
  activeRadioValue, setActiveRadioValue,
  radioList
}) => {

  const checkIsActive = (radio) => {
    for (let i = 0; i < radio.value.length; i++) {
      if (radio.value[i] !== activeRadioValue[i]) return false;
    }
    return true;
  };

  return (<>
    <Stack direction='horizontal' gap={2}>
      {radioList && radioList.map((radio, idx) => (
        <TableFilterIcon key={idx}
          radio={radio}
          isActive={checkIsActive(radio)}
          setActiveRadioValue={setActiveRadioValue}
        />
      ))}
    </Stack>
  </>);
};

export default TableFilterRadio;
