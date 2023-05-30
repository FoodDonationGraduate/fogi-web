// Essentials
import React, { useState } from 'react';
import { Button, Form, Modal, Stack } from 'react-bootstrap';

// Form handling
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

// Assets imports
import { FaExclamationTriangle } from 'react-icons/fa';

const ReportModal = ({ show, onClose, volunteerInfo, orderId }) => {

  // Form handling
  const formSchema = Yup.object().shape({
    reason: Yup.string().required('')
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  return (
    <>
      <Modal
        show={show}
        onHide={onClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Báo cáo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>

            <Form.Group className='mb-3'>
              <Form.Label style={{ fontWeight: 'bold'}}>
                Bạn đang báo cáo
              </Form.Label>

              <Stack direction='horizontal' gap={3}>
                <img src={`https://bachkhoi.online/static/${volunteerInfo.avatar}`} className='order-item-volunteer-avatar' />
                <Stack direction='vertical'>
                  <div className='order-item-volunteer-label'>Tình nguyện viên</div>
                  <div className='order-item-volunteer-name'>{volunteerInfo.name}</div>
                </Stack>
              </Stack>
            </Form.Group>

            <Form.Label style={{ fontWeight: 'bold'}}>
              Mã Yêu cầu: {orderId}
            </Form.Label>

            <Form.Group className='mb-3'>
              <Form.Label style={{ fontWeight: 'bold'}}>
                Lí do Báo cáo
              </Form.Label>
              <Form.Control {...register('reason')} as='textarea' />
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
                variant='primary'
                onClick={() => { console.log('report') }}
              >
                Gửi báo cáo
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
};

export default ReportModal;