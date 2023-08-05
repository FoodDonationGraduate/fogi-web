// Essentials
import React, { useState } from 'react';
import { Col, Form, Stack } from 'react-bootstrap';

// Assets
import { MdStars } from 'react-icons/md';

// Components
import {
  TableItemTitle,
  TableItemDate,
  TableItemAction,
  TableItemIcon
} from '../TableItemComponent';

const TableItemNews = ({
  news,
  actionList
}) => {
  return (
    <>
      <Col className='mn-table-item-col' xs={6}>
        <Stack direction='horizontal' gap={2}>
          <TableItemTitle title={news.title} onClick={() => { actionList[0].action(news) }} />
          {news.is_headline && <TableItemIcon icon={{ icon: MdStars, tip: 'Tin nổi bật' }} />}
        </Stack>
      </Col>
      <Col className='mn-table-item-col' xs={2}>
        <TableItemDate datetime={news.created_time} />
      </Col>
      <Col className='mn-table-item-col' xs={2}>
        <TableItemDate datetime={news.updated_time} />
      </Col>
      <Col className='mn-table-item-col' xs={2}>
        <Stack direction='horizontal' gap={2}>
          <TableItemAction label='Chỉnh sửa' onClick={() => { actionList[1].action(news) }} />
          <TableItemAction label='Xóa' color='red' onClick={() => { actionList[2].action(news) }} />
        </Stack>
      </Col>
    </>
  );
};

export default TableItemNews;
