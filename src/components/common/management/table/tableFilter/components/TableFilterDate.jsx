// Essentials
import React, { useState, useEffect } from 'react';
import { Col, Form, OverlayTrigger, Row, Tooltip, Stack } from 'react-bootstrap';

// Assets
import { MdHelp } from 'react-icons/md';

const TableFilterDate = ({
  date, setDate
}) => {

  const [tempDate, setTempDate] = useState({ min: '', max: '' });
  const onChangeMin = (event) => { setTempDate({ min: event.target.value, max: tempDate.max }) };
  const onChangeMax = (event) => { setTempDate({ min: tempDate.min, max: event.target.value }) };

  useEffect(() => {
    if (tempDate.min !== '' || tempDate.max !== '') setDate(tempDate);
  }, [tempDate]);

  useEffect(() => {
    if (date.min === '' && date.max === '') setTempDate({ min: '', max: '' });
  }, [date]);

  return (<>
    <Stack direction='horizontal' gap={1}>
      <Form>
        <Stack className='mn-table-filter-date' gap={1}>
          <Row className='d-flex align-items-center'>
            <Col className='ps-0' xs={3}>
              <div className='mn-table-filter-date'>
                Từ
              </div>
            </Col>
            <Col className='px-0' xs={9}>
              <Form.Control
                className='form-control mn-table-filter-date-input'
                onChange={onChangeMin}
                type='date'
                value={tempDate.min}
              />
            </Col>
          </Row>
          <Row className='d-flex align-items-center'>
            <Col className='ps-0' xs={3}>
              <div className='mn-table-filter-date'>
                Đến
              </div>
            </Col>
            <Col className='px-0' xs={9}>
              <Form.Control
                className='form-control mn-table-filter-date-input'
                onChange={onChangeMax}
                type='date'
                value={tempDate.max}
              />
            </Col>
          </Row>
        </Stack>
      </Form>
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
    </Stack>
  </>);
};

export default TableFilterDate;
