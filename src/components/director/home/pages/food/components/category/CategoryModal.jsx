// Essentials
import React, { useState, useEffect } from 'react';
import { Button, Form, Modal, Stack } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

// Components
import CategoryImageModal from './CategoryImageModal';

// Reducer
import { addCategory, addParentFood } from 'components/redux/reducer/DirectorReducer';

// Form handling
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

// Assets
import { FaExclamationTriangle } from 'react-icons/fa';

const CategoryModal = ({
  targetCategory, // for edit
  show,
  onShow,
  onClose
}) => {
  const userInfo = useSelector(state => state.authenticationReducer.user);
  const userToken = useSelector(state => state.authenticationReducer.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form handling
  const formSchema = Yup.object().shape({
    name: Yup.string().required(''),
    description: Yup.string().required('')
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, formState, reset } = useForm(formOptions);
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

  const onOpen = () => {
    reset({
      name: targetCategory ? targetCategory.name : '',
      description: targetCategory ? targetCategory.description : ''
    });
    onShow();
  };

  const onHide = () => {
    reset(
      {
        name: '',
        description: ''
      }
    );
    setImage(undefined);
    onClose();
  };

  const onSubmit = (data) => {
    if (!image) return;

    dispatch(addCategory(
      {
        name: data.name,
        description: data.description,
        image: image.split('base64,')[1]
      },
      { userInfo, userToken },
      navigate
    ));
    
    setImage(undefined);
    setSubmitted(false);

    onHide();
  };

  // Edit handling
  useEffect(() => {
    console.log(JSON.stringify(targetCategory))
    if (targetCategory) {
      setImage(`https://bachkhoi.online/static/${targetCategory.image}`);
    } else {
      setImage(undefined);
    }
  }, [targetCategory]);

  return (
    <>
      <Modal
        show={show}
        onShow={onOpen}
        onHide={onHide}
      >
        <Modal.Header closeButton>
          <Modal.Title>{targetCategory ? 'Chỉnh sửa' : 'Thêm'} Phân loại</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>

            <Stack direction='horizontal' className='mb-2' gap={4}>
              {image && 
                <img
                  src={image}
                  style={{ objectFit: 'cover' }}
                  alt='category-img'
                  width='128'
                  height='128'
                />
              }
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
              <Form.Control
                {...register('name')}
              />
              {errors.name && errors.name.type === 'required' && (
                <p className="mt-2 error">
                  <FaExclamationTriangle className="mx-2" />
                  Bạn chưa điền tên Phân loại
                </p>
              )}
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label style={{ fontWeight: 'bold'}}>
                Mô tả
              </Form.Label>
              <Form.Control
                {...register('description')}
                as='textarea'
              />
              {errors.description && errors.description.type === 'required' && (
                <p className="mt-2 error">
                  <FaExclamationTriangle className="mx-2" />
                  Bạn chưa điền mô tả
                </p>
              )}
            </Form.Group>

            <div className='d-grid'>
              {!targetCategory ? 
                <Button
                  className='fogi'
                  variant='primary'
                  type='submit'
                  onClick={() => setSubmitted(true)}
                >
                  Thêm Phân loại
                </Button>
                :
                <Button
                  className='fogi'
                  variant='primary'
                >
                  Lưu thay đổi
                </Button>
              }
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

export default CategoryModal;