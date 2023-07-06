// Essentials
import React, { useState, useEffect } from 'react';
import { Button, Col, Form, Modal, Row, Stack } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

// Components
import CategoryImageModal from '../category/CategoryImageModal';

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
    name: Yup.string().required(''),
    stock: Yup.number().required(),
    unit: Yup.string().required(),
    category: Yup.string().required(),
    subCategory: Yup.string().required()
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
      name: food.name,
      stock: food.stock,
      unit: food.unit,
      category: 0,
      subCategory: 1
    });
    setImage(`https://bachkhoi.online/static/${'category_13_image'}`);
    onShow();
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

    onClose();
  };

  // Edit handling
  useEffect(() => {
    console.log(JSON.stringify(food))
    if (food) {
      setImage(`https://bachkhoi.online/static/${'category_13_image'}`);
    } else {
      setImage(undefined);
    }
  }, [food]);

  return (
    <>
      <Modal
        show={show}
        onShow={onOpen}
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
                defaultValue={food ? food.name : ''}
              />
              {errors.name && errors.name.type === 'required' && (
                <p className="mt-2 error">
                  <FaExclamationTriangle className="mx-2" />
                  Bạn chưa điền tên Thực phẩm
                </p>
              )}
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label style={{ fontWeight: 'bold' }}>
                Số lượng
              </Form.Label>
              <Row>
                <Col className='ps-0' sm={8} md={8} lg={8}>
                  <Form.Control
                    type='number'
                    {...register('stock')}
                    defaultValue={food ? food.stock : 1}
                  />
                  {errors.stock && errors.stock.type === 'required' && (
                    <p className="mt-2 error">
                      <FaExclamationTriangle className="mx-2" />
                      Bạn chưa điền số lượng
                    </p>
                  )}
                </Col>
                <Col className='px-0' sm={4} md={4} lg={4}>
                  <Form.Select 
                    aria-label="Default select exampe" 
                    {...register('unit')}
                  >
                    <option value='kg'>Kilogram</option>
                    <option value='item'>Cái</option>
                  </Form.Select>
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label style={{ fontWeight: 'bold' }}>
                Phân loại
              </Form.Label>
              <Row>
                <Col className='ps-0' sm={6}>
                  <Form.Select 
                    {...register('category')}
                  >
                    <option value='0'>Đông lạnh</option>
                    <option value='1'>Tươi sống</option>
                    <option value='2'>Cơm</option>
                    <option value='3'>Không phân loại</option>
                  </Form.Select>
                </Col>
                <Col className='px-0' sm={6}>
                  <Form.Select 
                    {...register('subCategory')}
                  >
                    <option value='0'>Thịt heo</option>
                    <option value='1'>Thịt bò</option>
                    <option value='2'>Thịt cá</option>
                  </Form.Select>
                </Col>
              </Row>
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
                  type='submit'
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