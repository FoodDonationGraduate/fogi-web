// Essentials
import * as React from 'react';
import { useState } from 'react';
import {
  Button, Col, Form, InputGroup,
  Modal, Row, Stack
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Form handling
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

// Components
import UploadButton from 'components/common/UploadButton';
import Tooltip from 'components/common/Tooltip';
import { retrieveAllCategories } from 'components/redux/reducer/CategoryReducer';
import { postNewProduct } from 'components/redux/reducer/ProductReducer';
// Assets imports
import { FaExclamationTriangle } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';

// Style imports
import 'assets/css/Authentication.css';

const CreateRequestModal = ({
  show,
  onClose
}) => {
  const userInfo = useSelector(state => state.authenticationReducer.user);
  const userToken = useSelector(state => state.authenticationReducer.token);

  // Form handling
  const formSchema = Yup.object().shape({
    request: Yup.string().required('')
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Submit
  const onSubmit = (data) => {
    console.log('create request');
  };
  
  return (
    <>
      <Modal
        show={show}
        onHide={onClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tạo Yêu cầu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            
            <Form.Group className='mb-3'>
              <Form.Label style={{ fontWeight: 'bold' }}>
                Lí do đặt các Món ăn
              </Form.Label>
              <Form.Control as='textarea' {...register('request')} />
              {errors.name && errors.name.type === 'required' && (
                <p className="mt-2 error">
                  <FaExclamationTriangle className="mx-2" />
                  Bạn chưa điền Lí do đặt các món ăn
                </p>
              )}
            </Form.Group>

            <div className='d-grid'>
              <Button
                className='fogi'
                variant='primary'
                type='submit'
              >
                Tạo Yêu cầu
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreateRequestModal;
