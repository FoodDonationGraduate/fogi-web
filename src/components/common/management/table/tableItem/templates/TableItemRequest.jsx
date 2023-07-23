// Essentials
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Col, Stack } from 'react-bootstrap';

// Assets
import {
  MdUpload, MdDownload, MdLocalShipping, MdWarehouse, MdComputer
} from 'react-icons/md';

// Components
import {
  TableItemAvatar,
  TableItemTitle,
  TableItemIcon,
  TableItemTag,
  TableItemText,
  TableItemDate,
  TableItemAction
} from '../TableItemComponent';

// Utility
import { getState } from 'utils/helpers/Request';

const TableItemRequest = ({
  request
}) => {
  const navigate = useNavigate();
  const userInfo = useSelector(state => state.authenticationReducer.user);
  const { color, content } = getState({ request });

  return (
    <>
      <Col className='mn-table-item-col' xs={1}>
        <Stack direction='horizontal' gap={2}>
          <TableItemAvatar user={request.user} />
          <TableItemTitle title={request.id} onClick={() => { navigate(`/${userInfo.user_type}/request/${request.user.user_type}/${request.id}`) }} />
        </Stack>
      </Col>
      <Col className='mn-table-item-col' xs={1}>
        <TableItemTag color={color} label={content.chip} />
      </Col>
      <Col className='mn-table-item-col' xs={1}>
        <TableItemText text={request.num_product} />
      </Col>
      <Col className='mn-table-item-col' xs={1}>
        <TableItemText text={`${request.sum_kg} kg`} />
      </Col>
      <Col className='mn-table-item-col' xs={1}>
        <TableItemText text={`${request.sum_item} cái`} />
      </Col>
      <Col className='mn-table-item-col' xs={2}>
        <Stack direction='horizontal' gap={2}>
          {request.director && <>
            <TableItemIcon icon={{ icon: MdComputer, tip: 'Điều phối viên' }} />
            <TableItemAvatar user={request.director} />
          </>}
          {request.warehouse_keeper && <>
            <TableItemIcon icon={{ icon: MdWarehouse, tip: 'Quản lý kho' }} />
            <TableItemAvatar user={request.warehouse_keeper} />
          </>}
          {request.volunteer && <>
            <TableItemIcon icon={{ icon: MdLocalShipping, tip: 'Tình nguyện viên' }} />
            <TableItemAvatar user={request.volunteer} />
          </>}
          {!request.director && !request.warehouse_keeper && !request.volunteer &&
            <TableItemText text='Chưa có nhân sự nào phụ trách' />
          }
        </Stack>
      </Col>
      <Col className='mn-table-item-col' xs={2}>
        <TableItemDate datetime={request.created_time} />
      </Col>
      <Col className='mn-table-item-col' xs={2}>
        <TableItemDate datetime={request.last_updated_state_time} type='relative' />
      </Col>
      <Col className='mn-table-item-col' xs={1}>
        <TableItemText text={`${request.distance} km`} />
      </Col>
      <Col className='mn-table-item-col' xs={1}>
        
      </Col>
    </>
  );
};

export default TableItemRequest;