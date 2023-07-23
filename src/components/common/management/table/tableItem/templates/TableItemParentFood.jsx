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
  TableItemHeader,
  TableItemDate
} from '../TableItemComponent';

const TableItemParentFood = ({
  parentFood
}) => {
  const navigate = useNavigate();
  const userInfo = useSelector(state => state.authenticationReducer.user);

  return (
    <>
      <Col className='mn-table-item-col' xs={3}>
        <Stack direction='horizontal' gap={2}>
          <TableItemImage image={parentFood.image_filename} />
          <TableItemTitle title={parentFood.name} onClick={() => {}} />
        </Stack>
      </Col>
      <Col className='mn-table-item-col' xs={3}>
        <Stack direction='horizontal' gap={2}>
          <TableItemImage image={parentFood.category_image_filename} size='sm' />
          <TableItemHeader header={parentFood.category_name} onClick={() => {}} />
        </Stack>
      </Col>
      <Col className='mn-table-item-col' xs={2}>
        <TableItemText text={`${parentFood.stock} ${parentFood.unit}`} />
      </Col>
      <Col className='mn-table-item-col' xs={2}>
        <TableItemDate datetime={parentFood.created_time} />
      </Col>
      <Col className='mn-table-item-col' xs={2}>
        <TableItemDate datetime={parentFood.updated_time} type='relative' />
      </Col>
    </>
  );
};

export default TableItemParentFood;
