// Essentials
import React from 'react';
import { OverlayTrigger, Popover, Stack, Tooltip } from 'react-bootstrap';

// Utility
import { getRelativeTime, getShortDate } from 'utils/helpers/Time.jsx';

// Main Components
export const TableItemAvatar = ({
  user
}) => {

  return (<>
    <OverlayTrigger
      placement={'top'}
      overlay={
        <Popover
          className='mn-user-item-static'
          style={{ position: 'fixed' }}
        >
          <Popover.Body>
            <Stack direction='horizontal' gap={2}>
              <img
                className='mn-user-item-avatar'
                src={`https://bachkhoi.online/static/${user.avatar}`}
              />
              <Stack>
                <div className='mn-user-item-name'>
                  {user.name}
                </div>
                <div className='mn-user-item-email'>
                  {user.email}
                </div>
              </Stack>
            </Stack>
          </Popover.Body>
        </Popover>
      }
    >
      <img
        className='mn-table-item-avatar' 
        src={`https://bachkhoi.online/static/${user.avatar}`}
      />
    </OverlayTrigger>
  </>);
};

export const TableItemTitle = ({
  title
}) => {

  return (<>
    <div className='mn-table-item-title'>
      {title}
    </div>
  </>);
};

export const TableItemIcon = ({
  icon
}) => {
  return (<>
    <OverlayTrigger
      placement='top'
      overlay={
        <Tooltip style={{ position: 'fixed' }}>{icon.tip}</Tooltip>
      }
    >
      <div className='d-flex align-items-center'>
        <icon.icon className='mn-table-item-icon' />
      </div>
    </OverlayTrigger>
  </>);
};

export const TableItemTag = ({
  color,
  label
}) => {

  return (<>
    <div className={`mn-table-item-tag mn-bg-${color}`}>
      {label}
    </div>
  </>);
};

export const TableItemText = ({
  text
}) => {

  return (<>
    <div className='mn-table-item-text'>
      {text}
    </div>
  </>);
};

export const TableItemDate = ({
  datetime,
  type='short'
}) => {

  return (<>
    <OverlayTrigger
      placement='top'
      overlay={
        <Tooltip style={{ position: 'fixed' }}>{datetime}</Tooltip>
      }
    >
      <div className='mn-table-item-date'>
        {type === 'relative' ? getRelativeTime(datetime) : getShortDate(datetime)}
      </div>
    </OverlayTrigger>
  </>);
};

export const TableItemAction = ({
  label,
  onClick
}) => {

  return (<>
    <div className='mn-table-item-action' onClick={onClick}>
      {label}
    </div>
  </>);
};