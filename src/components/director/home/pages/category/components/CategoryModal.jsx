// Essentials
import React, { useState, useRef } from 'react';
import { Button, Form, Modal, Stack } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

// Components
import CategoryImageModal from './CategoryImageModal';

// Reducer
import { addCategory } from 'components/redux/reducer/DirectorReducer';

// Form handling
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

// Assets
import { FaExclamationTriangle } from 'react-icons/fa';

const ReportModal = ({ show, onShow, onClose }) => {
  const userInfo = useSelector(state => state.authenticationReducer.user);
  const userToken = useSelector(state => state.authenticationReducer.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form handling
  const formSchema = Yup.object().shape({
    name: Yup.string().required('')
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  // Avatar
  const [image, setImage] = useState(undefined);
  const [submitted, setSubmitted] = useState(false);
  const [showImage, setShowImage] = useState(false); // image modal
  const onCloseImage = () => {
    setShowImage(false);
    onShow();
  };
  const onShowImage = () => {
    setShowImage(true);
    onClose();
  };

  // Form handling
  const [validated, setValidated] = useState(false);
  const formRef = useRef(null);
  const handleFormReset = () => {
    formRef.current.reset();
    setValidated(false);
  };

  const onSubmit = (data) => {
    if (!image) return;
    console.log('add category');

    dispatch(addCategory(
      {
        name: data.name,
        image: image.split('base64,')[1]
      },
      { userInfo, userToken },
      navigate
    ));

    setImage(undefined);
    setSubmitted(false);

    setValidated(true);
    handleFormReset();

    onClose();
  };

  return (
    <>
      <Modal
        show={show}
        onHide={onClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thêm Phân loại</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form ref={formRef} validated={validated} onSubmit={handleSubmit(onSubmit)}>

            <Stack direction='horizontal' className='mb-2' gap={4}>
              {image && <img src={image} className='rounded-circle' width='128' height='128' />}
              <Button variant='outline-secondary' onClick={onShowImage}>
                Đăng tải Ảnh Phân loại
              </Button>
            </Stack>
            {!image && submitted && (
              <p className="error">
                <FaExclamationTriangle className="mx-2" />
                Bạn chưa đăng tải ảnh
              </p>
            )}

            <Form.Group className='mb-3'>
              <Form.Label style={{ fontWeight: 'bold'}}>
                Tên Phân loại
              </Form.Label>
              <Form.Control {...register('name')} />
              {errors.name && errors.name.type === 'required' && (
                <p className="mt-2 error">
                  <FaExclamationTriangle className="mx-2" />
                  Bạn chưa điền tên phân loại
                </p>
              )}
            </Form.Group>

            <div className='d-grid'>
              <Button
                className='fogi'
                variant='primary'
                type='submit'
                onClick={() => setSubmitted(true)}
              >
                Thêm Phân loại
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <CategoryImageModal
        showImage={showImage}
        onClose={onCloseImage}
        setImage={setImage}
      />
    </>
  )
};

export default ReportModal;