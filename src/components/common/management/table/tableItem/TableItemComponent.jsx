// Essentials
import React from 'react';
import { OverlayTrigger, Popover, Stack, Tooltip } from 'react-bootstrap';

// Main Components
export const TableItemAvatar = ({
  user
}) => {

  return (<>
    <OverlayTrigger
      placement={'top'}
      overlay={
        <Popover className='mn-table-item-avatar-overlay'>
          <Popover.Body>
            <Stack direction='horizontal' gap={2}>
              <img
                className='mn-table-item-avatar-overlay-avatar'
                src={`https://bachkhoi.online/static/${user.avatar}`}
              />
              <Stack>
                <div className='mn-table-item-avatar-overlay-name'>
                  {user.name}
                </div>
                <div className='mn-table-item-avatar-overlay-email'>
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
        <Tooltip>{icon.tip}</Tooltip>
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