// Essentials
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Col, Stack } from 'react-bootstrap';

// Components
import {
  TableItemImage,
  TableItemTitle,
  TableItemText,
  TableItemDate
} from '../TableItemComponent';

const TableItemCategory = ({
  category
}) => {
  const navigate = useNavigate();
  const userInfo = useSelector(state => state.authenticationReducer.user);

  return (
    <>
      <Col className='mn-table-item-col' xs={3}>
        <Stack direction='horizontal' gap={2}>
          <TableItemImage image={category.image} />
          <TableItemTitle title={category.name} onClick={() => { navigate(`/${userInfo.user_type}/category/${category.id}`) }} />
        </Stack>
      </Col>
      <Col className='mn-table-item-col' xs={4}>
        <TableItemText text={category.description} />
      </Col>
      <Col className='mn-table-item-col' xs={1}>
        <TableItemText text={category.total_products} />
      </Col>
      <Col className='mn-table-item-col' xs={2}>
        <TableItemDate datetime={category.created_time} />
      </Col>
      <Col className='mn-table-item-col' xs={2}>
        <TableItemDate datetime={category.updated_time} type='relative' />
      </Col>
    </>
  );
};

export default TableItemCategory;
