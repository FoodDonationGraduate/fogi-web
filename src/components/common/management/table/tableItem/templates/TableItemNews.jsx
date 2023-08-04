// Essentials
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Col, Form, Stack } from 'react-bootstrap';

// Components
import {
  TableItemTitle,
  TableItemDate,
  TableItemAction
} from '../TableItemComponent';

const TableItemNews = ({
  news,
  actionList
}) => {

  return (
    <>
      <Col className='mn-table-item-col' xs={5}>
        <Stack direction='horizontal' gap={2}>
          <TableItemTitle title={news.title} />
        </Stack>
      </Col>
      <Col className='mn-table-item-col' xs={1}>
        <Form.Check
          checked={news.is_headline}
        />
      </Col>
      <Col className='mn-table-item-col' xs={2}>
        <TableItemDate datetime={news.created_time} />
      </Col>
      <Col className='mn-table-item-col' xs={2}>
        <TableItemDate datetime={news.updated_time} />
      </Col>
      <Col className='mn-table-item-col' xs={2}>
        <Stack direction='horizontal' gap={2}>
          <TableItemAction label='Chỉnh sửa' onClick={() => {  }} />
          <TableItemAction label='Xóa' color='red' onClick={() => {  }} />
        </Stack>
      </Col>
    </>
  );
};

export default TableItemNews;
