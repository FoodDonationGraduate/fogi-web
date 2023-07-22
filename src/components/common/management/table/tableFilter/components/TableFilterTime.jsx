// Essentials
import React, { useState, useEffect } from 'react';
import { Col, Form, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';

// Assets
import { MdHelp } from 'react-icons/md';

// Utility
import { formatDateTime } from 'utils/helpers/Time';

const TableFilterTime = ({
  date, setDate
}) => {
  const onChangeMin = (event) => {
    setDate({
    min: event.target.value === '' ? '' : formatDateTime(event.target.value, 'YYYY-MM-DD HH:mm:ss'),
    max: date.max
  })};
  const onChangeMax = (event) => { setDate({
    min: date.min,
    max: event.target.value === '' ? '' : formatDateTime(event.target.value, 'YYYY-MM-DD HH:mm:ss')
  })};

  return (<>
    <div className='me-2'>
      <div className='mn-table-filter-date'>
        <Row className='d-flex align-items-center'>
          <Col className='px-0' xs={2}>
            <div className='mn-table-filter-date'>
              Từ
            </div>
          </Col>
          <Col className='px-0' xs={10}>
            <Form.Control
              className='mn-table-filter-date-input'
              onChange={onChangeMin}
              type='datetime-local'
              value={date.min}
            />
          </Col>
        </Row>
        <Row className='d-flex align-items-center'>
          <Col className='px-0' xs={2}>
            <div className='mn-table-filter-date'>
              Đến
            </div>
          </Col>
          <Col className='px-0' xs={10}>
            <Form.Control
              className='mn-table-filter-date-input'
              onChange={onChangeMax}
              type='datetime-local'
              value={date.max}
            />
          </Col>
        </Row>
      </div>
    </div>
    <OverlayTrigger
      placement='top'
      overlay={
        <Tooltip style={{ position: 'fixed' }}>
          Để trống cả hai để lấy tất cả các ngày
        </Tooltip>
      }
    >
      <div className='d-flex align-items-center'>
        <MdHelp className='mn-table-filter-helper mn-green' />
      </div>
    </OverlayTrigger>
  </>);
};

export default TableFilterTime;
