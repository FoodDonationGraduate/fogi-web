// Essentials
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Form, OverlayTrigger, Modal, Popover, Stack, Tooltip } from 'react-bootstrap';

// Assets
import DefaultAvatar from 'assets/images/default_avatar.jpg';
import { MdSearch } from 'react-icons/md';

// Form handling
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

// Reducers
import { retrieveManageUsers } from 'components/redux/reducer/DirectorReducer';

// Utility
import { getUserTypeLabel } from 'utils/helpers/User.jsx';

// Support Components
export const UserModalItem = ({
  user, setUser,
  onHide
}) => {
  const onClick = () => {
    setUser(user);
    onHide();
  };
  
  return (<>
    <div className='mn-user-item' onClick={onClick}>
      <Stack direction='horizontal' gap={2}>
        <img
          className='mn-user-item-avatar'
          src={`https://bachkhoi.online/static/${user.avatar}`}
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
    </div>
  </>);
};

export const UserFilterModal = ({
  show, onHide,
  user, setUser,
  userType
}) => {
  // Constants
  const userInfo = useSelector(state => state.authenticationReducer.user)
  const userToken = useSelector(state => state.authenticationReducer.token)
  const dispatch = useDispatch(); const navigate = useNavigate();

  // Search
  const [queryData, setQueryData] = useState('');
  const formSchema = Yup.object().shape({
    query: Yup.string().required('')
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, reset } = useForm(formOptions);
  const onSubmit = (data) => {
    console.log(data.query);
    setQueryData(data.query);
  };

  const onOpen = () => {
    reset({
      query: ''
    });
    setQueryData('');
  };

  // Users
  const manageUsers = useSelector(state => state.directorReducer.manageUsers);
  useEffect(() => {
    let data = {
      user_type: userType,
      limit: 10,
      offset: 0,
      search_query: queryData
    };
    dispatch(retrieveManageUsers(data, { userInfo, userToken }, navigate));
  }, [userType, queryData]);
  
  
  return (<>
    <Modal show={show} onShow={onOpen} onHide={onHide}>
      <Modal.Header closeButton>
        Lọc theo {getUserTypeLabel(userType)}
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction='horizontal'>
            <Form.Control
              placeholder={`Tên hoặc email`}
              {...register('query')}
            />
            <Button type='submit' variant='dark'>
              <MdSearch className='mb-1' />
            </Button>
          </Stack>
        </Form>
        <Stack className='mt-2' gap={2}>
          {user &&
            <div className='mn-table-item-action' onClick={() => { setUser(null); onHide(); }}>
              Bỏ chọn
            </div>
          }
          {Object.keys(manageUsers).length > 0 && manageUsers.users.map((user, idx) => (
            <UserModalItem key={idx}
              user={user} setUser={setUser}
              onHide={onHide}
            />
          ))}
        </Stack>
      </Modal.Body>
    </Modal>
  </>);
};

// Main Components
const TableFilterUser = ({
  user, setUser,
  userType,
  tip
}) => {
  const [show, setShow] = useState(false);
  const onShow = () => setShow(true); const onHide = () => setShow(false);

  return (<>
    <OverlayTrigger
      placement={'top'}
      overlay={
        !user ? 
        <Tooltip style={{ position: 'fixed' }}>
          <div>{tip}</div>
        </Tooltip> :
        <Popover
          className='mn-user-item-static'
          style={{ position: 'fixed' }}
        >
          <Popover.Body>
            <Stack direction='horizontal' gap={2}>
              <img
                className='mn-user-item-avatar'
                src={`https://bachkhoi.online/static/${user.avatar}`}
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
      <div className='d-flex align-items-center' onClick={onShow}>
        <img
          className='mn-table-item-avatar' 
          src={
            user ? `https://bachkhoi.online/static/${user.avatar}`
            : DefaultAvatar
          }
        />
      </div>
    </OverlayTrigger>
    <UserFilterModal
      show={show} onHide={onHide}
      user={user} setUser={setUser}
      userType={userType}
    />
  </>);
};

export default TableFilterUser;