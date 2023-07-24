// Essentials
import React from 'react';
import { Col, Stack } from 'react-bootstrap';

// Components
import {
  TableItemImage,
  TableItemTitle,
  TableItemText,
  TableItemDate,
  TableItemAction
} from '../TableItemComponent';

const TableItemUnsortedFood = ({
  food,
  actionList
}) => {

  return (
    <>
      <Col className='mn-table-item-col' xs={5}>
        <Stack direction='horizontal' gap={2}>
          <TableItemImage image={food.image_filename} />
          <TableItemTitle title={food.name} />
        </Stack>
      </Col>
      <Col className='mn-table-item-col' xs={3}>
        <TableItemDate datetime={food.expired_time} postfix='' type='relative-alt' />
      </Col>
      <Col className='mn-table-item-col' xs={3}>
        <TableItemText text={`${food.stock} ${food.unit === 'kg' ? 'Kg' : 'Cái'}`} />
      </Col>
      <Col className='mn-table-item-col' xs={1}>
        <TableItemAction label='Phân loại' onClick={() => { actionList[0].action(food) }} />
      </Col>
    </>
  );
};

export default TableItemUnsortedFood;
