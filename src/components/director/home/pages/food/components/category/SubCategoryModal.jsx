// Essentials
import React, { useState, useEffect } from 'react';
import { Button, Form, Modal, Stack } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

// Components
import CategoryImageModal from './CategoryImageModal';

// Reducer
import { addParentFood, updateParentFood } from 'components/redux/reducer/DirectorReducer';

// Form handling
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

// Assets
import { FaExclamationTriangle } from 'react-icons/fa';

const SubCategoryModal = ({
  targetCategory,
  targetSubCategory,
  setTargetSubCategory,
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
    description: Yup.string().required(''),
    unit: Yup.string().required('')
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
      name: targetSubCategory ? targetSubCategory.name : '',
      description: targetSubCategory ? targetSubCategory.description : '',
      unit: targetSubCategory ? targetSubCategory.unit : 'kg'
    });
    onShow();
  };

  const onHide = () => {
    reset({
        name: '',
        description: '',
        unit: 'kg'
      }
    );
    onClose();
  };

  const onSubmit = (data) => {
    console.log('hahaha')
    if (!image) return;

    if (!targetSubCategory) {
      dispatch(addParentFood(
        {
          name: data.name,
          description: data.description,
          unit: data.unit,
          category_id: targetCategory.id,
          image: image.split('base64,')[1]
        },
        { userInfo, userToken },
        navigate
      ));
    } else {
      dispatch(updateParentFood(
        {
          name: data.name,
          description: data.description,
          unit: data.unit,
          id: targetSubCategory.id,
          category_id: targetCategory.id,
          image: image.split('base64,')[1],
          targetSubCategory: targetSubCategory,
          setTargetSubCategory: setTargetSubCategory
        },
        { userInfo, userToken },
        navigate
      ));
    }

    setImage(undefined);
    setSubmitted(false);

    onHide();
  };

  // Edit handling
  useEffect(() => {
    console.log(JSON.stringify(targetSubCategory))
    if (targetSubCategory) {
      setImage(`https://bachkhoi.online/static/${targetSubCategory.image_filename}`);
    } else {
      setImage(undefined);
    }
  }, [targetSubCategory]);

  return (
    <>
      <Modal
        show={show}
        onShow={onOpen}
        onHide={onHide}
      >
        <Modal.Header closeButton>
          <Modal.Title>{targetSubCategory ? 'Chỉnh sửa' : 'Thêm'} Thực phẩm Cha</Modal.Title>
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
                Đăng tải Ảnh Thực phẩm Cha
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
                Tên Thực phẩm Cha
              </Form.Label>
              <Form.Control
                {...register('name')}
              />
              {errors.name && errors.name.type === 'required' && (
                <p className="mt-2 error">
                  <FaExclamationTriangle className="mx-2" />
                  Bạn chưa điền tên Thực phẩm Cha
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

            <Form.Group className='mb-3'>
              <Form.Label style={{ fontWeight: 'bold' }}>
                Đơn vị
              </Form.Label>
              <Form.Select
                {...register('unit')}
              >
                <option value='kg'>Kilogram</option>
                <option value='item'>Cái</option>
              </Form.Select>
            </Form.Group>

            <div className='d-grid'>
              {!targetSubCategory ? 
                <Button
                  className='fogi'
                  variant='primary'
                  type='submit'
                  onClick={() => setSubmitted(true)}
                >
                  Thêm Thực phẩm Cha
                </Button>
                :
                <Button
                  className='fogi'
                  variant='primary'
                  type='submit'
                  onClick={() => setSubmitted(true)}
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

export default SubCategoryModal;