// Essentials
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Col, Stack } from 'react-bootstrap';

// Assets
import {
  MdOutlineLock, MdGppMaybe
} from 'react-icons/md';

// Components
import {
  TableItemImage,
  TableItemTitle,
  TableItemText,
  TableItemIcon
} from '../TableItemComponent';

const TableItemUser = ({
  user
}) => {
  const navigate = useNavigate();
  const userInfo = useSelector(state => state.authenticationReducer.user);

  return (
    <>
      <Col className='mn-table-item-col' xs={2}>
        <Stack direction='horizontal' gap={2}>
          <TableItemImage image={user.avatar} />
          <TableItemTitle title={user.name} onClick={() => { navigate(`/${userInfo.user_type}/user/${user.user_type}/${user.email}`) }} />
        </Stack>
      </Col>
      <Col className='mn-table-item-col' xs={2}>
        <TableItemText text={`${user.email}`} />
      </Col>
      {user.user_type === 'donee' &&
        <Col className='mn-table-item-col' xs={2}>
          <TableItemText text={`${user.num_take_request}`} />
        </Col>
      }
      {user.user_type === 'donor' &&
        <Col className='mn-table-item-col' xs={2}>
          <TableItemText text={`${user.num_give_request}`} />
        </Col>
      }
      {user.user_type === 'volunteer' ?
        <>
          <Col className='mn-table-item-col' xs={2}>
            <TableItemText text={`${user.num_give_request}`} />
          </Col>
          <Col className='mn-table-item-col' xs={2}>
            <TableItemText text={`${user.num_take_request}`} />
          </Col>
        </> :
        <>
          <Col className='mn-table-item-col' xs={1}>
            <TableItemText text={`${user.sum_kg}`} />
          </Col>
          <Col className='mn-table-item-col' xs={1}>
            <TableItemText text={`${user.sum_item}`} />
          </Col>
        </>
      }
      <Col className='mn-table-item-col' xs={2}>
        <TableItemText text={`${user.num_of_report}`} />
      </Col>
      <Col className='mn-table-item-col' xs={2}>
        <Stack direction='horizontal' gap={2}>
          {user.is_locked && 
            <TableItemIcon icon={{ icon: MdOutlineLock, tip: 'Bị khóa' }} />
          }
          {!user.is_approved && 
            <TableItemIcon icon={{ icon: MdGppMaybe, tip: 'Bị hạn chế' }} />
          }
        </Stack>
      </Col>
    </>
  );
};

export default TableItemUser;
