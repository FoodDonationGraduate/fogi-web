// Essentials
import React, { useState, useEffect } from 'react';
import { Button, Form, Modal, Stack } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

// Components
import CategoryImageModal from '../CategoryImageModal';

// Form handling
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

// Assets
import { FaExclamationTriangle } from 'react-icons/fa';

const FoodModal = ({
  food,
  show, onShow, onClose
}) => {

  // Form handling
  const formSchema = Yup.object().shape({
    name: Yup.string().required('')
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const [name, setName] = useState('');
  const onNameChange = (event) => setName(event.target.value);

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

  const onSubmit = (data) => {
    if (!image) return;

    // dispatch(addCategory(
    //   {
    //     name: data.name,
    //     image: image.split('base64,')[1]
    //   },
    //   { userInfo, userToken },
    //   navigate
    // ));

    setImage(undefined);
    setSubmitted(false);

    setName('');

    onClose();
  };

  // Edit handling
  useEffect(() => {
    console.log(JSON.stringify(food))
    if (food) {
      setImage(`https://bachkhoi.online/static/${'category_13_image'}`);
      setName(food.name);
    } else {
      setImage(undefined);
      setName('');
    }
  }, [food]);

  return (
    <>
      <Modal
        show={show}
        onHide={onClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa Thực phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>

            <Stack direction='horizontal' className='mb-2' gap={4}>
              {image && 
                <img
                  src={image}
                  className='rounded-circle'
                  style={{ objectFit: 'cover' }}
                  alt='category-img'
                  width='128'
                  height='128'
                />
              }
              <Button variant='outline-secondary' onClick={onShowImage}>
                Đăng tải Ảnh Thực phẩm
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
                Tên Thực phẩm
              </Form.Label>
              <Form.Control
                {...register('name')}
                value={name}
                onChange={onNameChange}
              />
              {errors.name && errors.name.type === 'required' && (
                <p className="mt-2 error">
                  <FaExclamationTriangle className="mx-2" />
                  Bạn chưa điền tên Thực phẩm
                </p>
              )}
            </Form.Group>

            <div className='d-grid'>
              {!food ? 
                <Button
                  className='fogi'
                  variant='primary'
                  type='submit'
                  onClick={() => setSubmitted(true)}
                >
                  Thêm Thực phẩm
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

export default FoodModal;