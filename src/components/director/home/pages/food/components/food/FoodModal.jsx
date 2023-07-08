// Essentials
import React, { useState, useEffect } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

// Assets
import { FaExclamationTriangle } from 'react-icons/fa';

// Form handling
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

// Reducers
import { retrieveParentFood } from 'components/redux/reducer/DirectorReducer';

const FoodModal = ({
  food,
  show, onShow, onClose
}) => {
  const userInfo = useSelector(state => state.authenticationReducer.user);
  const userToken = useSelector(state => state.authenticationReducer.token);
  const parentFood = useSelector(state => state.directorReducer.parentFood);
  const dispatch = useDispatch(); const navigate = useNavigate();

  useEffect(() => {
    dispatch(retrieveParentFood({}, { userInfo, userToken }, navigate));
  }, []);

  const [parentOptions, setParentOptions] = useState([]);
  useEffect(() => {
    if (Object.keys(parentFood).length === 0) return;
    const parents = parentFood.products;
    for (let i = 0; i < parentFood.number_of_products; i++) {
      setParentOptions([
        ...parentOptions,
        {
          value: parents[i].id,
          label: parents[i].name
        }
      ])
    }
  }, [parentFood]);

  // Form handling
  const formSchema = Yup.object().shape({
    name: Yup.string().required(''),
    stock: Yup.number().required(),
    unit: Yup.string().required(),
    parentProduct: Yup.number().required().min(0)
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, formState, reset } = useForm(formOptions);
  const { errors } = formState;

  const onOpen = () => {
    reset({
      name: food.name,
      stock: food.stock,
      unit: food.unit,
      parentProduct: -1
    });
    onShow();
  };

  const onSubmit = (data) => {
    onClose();
  };

  return (
    <>
      <Modal
        show={show}
        onShow={onOpen}
        onHide={onClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thực phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <img
            src={`https://bachkhoi.online/static/${food.image_filename}`}
            className='rounded-circle mb-2'
            style={{ objectFit: 'cover' }}
            alt='category-img'
            width='128'
            height='128'
          />
          <Form onSubmit={handleSubmit(onSubmit)}>
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
                Tồn kho
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
              <Form.Select
                default-value={-1}
                {...register('parentProduct')}
              >
                <option value={-1}>-</option>
                {parentOptions.length > 0 && parentOptions.map((parentOption, idx) => (
                  <option value={parentOption.value} key={idx}>{parentOption.label}</option>
                ))}
              </Form.Select>
              {errors.parentProduct && errors.parentProduct.type === 'min' && (
                <p className="mt-2 error">
                  <FaExclamationTriangle className="mx-2" />
                  Bạn chưa chọn Thực phẩm cha
                </p>
              )}
            </Form.Group>

            <div className='d-grid'>
              <Button
                className='fogi'
                variant='primary'
                type='submit'
              >
                Lưu thay đổi
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
};

export default FoodModal;