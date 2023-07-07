// Essentials
import React, { useState } from 'react';
import { Button, Form, Modal, Stack } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

// Form handling
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

// Utility
import { updateRequest } from 'components/redux/reducer/RequestReducer';
import { cancelRequest as cancelRequestDir } from 'components/redux/reducer/DirectorReducer';
import { handleMaxInput } from 'utils/helpers/String';

// Assets imports
import { FaExclamationTriangle } from 'react-icons/fa';

const CancelModal = ({ show, onClose, request }) => {
  const userInfo = useSelector(state => state.authenticationReducer.user);
  const userToken = useSelector(state => state.authenticationReducer.token);

  // Form handling
  const formSchema = Yup.object().shape({
    reason: Yup.string().required('')
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cancelRequest = (data) => {
    if (!request.user)
      dispatch(updateRequest(
        {
          request_id: request.id,
          request_status: 'canceled',
          cancel_reason: data.reason
        },
        {userInfo, userToken},
        navigate
      ));
    else
      dispatch(cancelRequestDir(
        {
          request_id: request.id,
          request_from: request.user.user_type,
          cancel_reason: data.reason
        },
        {userInfo, userToken},
        navigate
      ));
  };
  const [reason, setReason] = useState('');

  return (
    <>
      <Modal
        show={show}
        onHide={onClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Hủy Yêu cầu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(cancelRequest)}>

            <Form.Label style={{ fontWeight: 'bold'}}>
              Mã Yêu cầu: {request.id}
            </Form.Label>

            {request.volunteer && (
              <>
                <Form.Group className='mb-3'>
                  <Stack direction='horizontal' gap={3}>
                    <img alt='volunteer-avatar' src={`https://bachkhoi.online/static/${request.volunteer.avatar}`} className='order-item-volunteer-avatar-m' />
                    <Stack direction='vertical'>
                      <div className='order-item-volunteer-label'>Tình nguyện viên</div>
                      <div className='order-item-volunteer-name'>{request.volunteer.name}</div>
                    </Stack>
                  </Stack>
                </Form.Group>
              </>
            )}

            {request.user && (
              <>
                <Form.Group className='mb-3'>
                  <Stack direction='horizontal' gap={3}>
                    <img alt='volunteer-avatar' src={`https://bachkhoi.online/static/${request.user.avatar}`} className='order-item-volunteer-avatar-m' />
                    <Stack direction='vertical'>
                      <div className='order-item-volunteer-label'>
                        Người {request.user.user_type === 'donor' ? 'cho' : 'nhận'}
                      </div>
                      <div className='order-item-volunteer-name'>{request.user.name}</div>
                    </Stack>
                  </Stack>
                </Form.Group>
              </>
            )}

            <Form.Group className='mb-3'>
              <Form.Label style={{ fontWeight: 'bold'}}>
                Lí do hủy
              </Form.Label>
              <Form.Control
                {...register('reason')}
                value={reason}
                onChange={(event) => handleMaxInput(event, 255, setReason)}
                as='textarea'
              />
              <Form.Text>
                Còn {255 - reason.length} ký tự
              </Form.Text>
              {errors.reason && errors.reason.type === 'required' && (
                <p className="mt-2 error">
                  <FaExclamationTriangle className="mx-2" />
                  Bạn chưa điền lí do
                </p>
              )}
            </Form.Group>

            <div className='d-grid'>
              <Button
                className='fogi'
                variant='danger'
                type='submit'
              >
                Hủy Yêu cầu
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
};

export default CancelModal;