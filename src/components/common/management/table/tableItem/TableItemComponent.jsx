// Essentials
import React from 'react';
import { OverlayTrigger, Popover, Stack, Tooltip } from 'react-bootstrap';

// Utility
import { distanceTime, getRelativeTime,  getShortDate, formatDateTime } from 'utils/helpers/Time.jsx';

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
                alt='user avatar'
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
        alt='user avatar'
      />
    </OverlayTrigger>
  </>);
};

export const TableItemImage = ({
  image,
  size='md'
}) => {

  return (<>
    <OverlayTrigger
      placement={'top'}
      overlay={
        <Popover
          style={{ position: 'fixed' }}
        >
          <Popover.Body>
            <img
              className='mn-table-item-image-lg'
              src={`https://bachkhoi.online/static/${image}`}
              alt='img'
            />
          </Popover.Body>
        </Popover>
      }
    >
      <img
        className={`mn-table-item-image-${size}`} 
        src={`https://bachkhoi.online/static/${image}`}
        alt='img'
      />
    </OverlayTrigger>
  </>);
};

export const TableItemTitle = ({
  title,
  onClick=null,
  size='default'
}) => {
  const style = onClick ? '' : '-static';
  const sizeStyle = size === 'sm' ? 'header' : 'title';

  return (<>
    <div className={`mn-table-item-${sizeStyle}${style}`} onClick={onClick ? onClick : () => {}}>
      {title}
    </div>
  </>);};

export const TableItemHeader = ({
  header,
  onClick
}) => {

  return (<>
    <div className='mn-table-item-header' onClick={onClick}>
      {header}
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
  label,
  tip=null
}) => {

  return (<>
    <OverlayTrigger
      placement='top'
      overlay={
        tip ? <Tooltip style={{ position: 'fixed' }}>{tip}</Tooltip>
        : <></>
      }
    >
      <div className={`mn-table-item-tag mn-bg-${color}`}>
        {label}
      </div>
    </OverlayTrigger>
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
  postfix='trước',
  type='default',
  hasTip=false
}) => {

  return (<>
    <OverlayTrigger
      placement='top'
      overlay={hasTip ?
        <Tooltip style={{ position: 'fixed' }}>{formatDateTime(datetime, 'DD/MM/YYYY • HH:mm:ss')}</Tooltip>
        : <></>
      }
    >
      <div className={`mn-table-item-date ${hasTip ? 'mn-underline' : ''}`}>
        {type === 'relative' && getRelativeTime(datetime, postfix)}
        {type === 'relative-alt' && distanceTime(datetime)}
        {type === 'short' && getShortDate(datetime)}
        {type === 'default' && formatDateTime(datetime, 'DD/MM/YYYY • HH:mm:ss')}
      </div>
    </OverlayTrigger>
  </>);
};

export const TableItemAction = ({
  label,
  onClick,
  color='green'
}) => {

  return (<>
    <div className={`mn-table-item-action mn-${color}`} onClick={onClick}>
      {label}
    </div>
  </>);
};