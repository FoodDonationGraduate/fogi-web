// Essentials
import React, { useState, useEffect } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getUnit } from 'utils/helpers/Food';

// Assets
import { FaExclamationTriangle } from 'react-icons/fa';

// Components
import CategoryModal from '../category/CategoryModal';
import SubCategoryModal from '../parentFood/SubCategoryModal';

// Form handling
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

// Reducers
import { retrieveAllParentFood, setAllParentFood, updateFood } from 'components/redux/reducer/DirectorReducer';
import { retrieveAllCategories } from 'components/redux/reducer/CategoryReducer';

const FoodModal = ({
  food,
  isSorted=false,
  show, onShow, onClose,
  limit, offset
}) => {
  const userInfo = useSelector(state => state.authenticationReducer.user);
  const userToken = useSelector(state => state.authenticationReducer.token);
  const allParentFood = useSelector(state => state.directorReducer.allParentFood);
  const allCategories = useSelector(state => state.categoryReducer.allCategories);

  const dispatch = useDispatch(); const navigate = useNavigate();

  const [isMatchUnit, setIsMatchUnit] = useState(true);

  // Form handling
  const formSchema = Yup.object().shape({
    name: Yup.string().required(''),
    stock: Yup.number().required(),
    category: Yup.number().required().min(0),
    parentFood: Yup.number().required().min(0),
    unit: Yup.string().required()
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, getValues, setValue, handleSubmit, formState, reset } = useForm(formOptions);
  const { errors } = formState;

  const onOpen = () => {
    reset({
      name: food.name,
      stock: food.stock,
      unit: food.unit,
      category: -1,
      parentFood: -1
    });
    onShow();
  };

  const onSubmit = (data) => {
    if (data.unit !== allParentFood.products.find(f => f.id === data.parentFood).unit) {
      setIsMatchUnit(false);
      return;
    }
    setIsMatchUnit(true);
    
    dispatch(updateFood(
      {
        child_id: food.id,
        parent_id: data.parentFood,
        child_name: data.name,
        child_stock: data.stock,
        child_unit: data.unit,
        limit: limit,
        offset: offset,
        is_sorted: isSorted
      },
      { userInfo, userToken },
      navigate
    ));

    onClose();
  };

  useEffect(() => {
    dispatch(retrieveAllCategories({}, navigate));
    dispatch(setAllParentFood({}));
  }, []);

  useEffect(() => {
    setValue('parentFood', -1);
  }, [getValues('category')]);

  const getAllParentFood = (event) => {
    const category_id = event.target.value;
    setValue('category', category_id);
    dispatch(retrieveAllParentFood({ category_id }, { userInfo, userToken }, navigate));
  };

  // Category Modal
  const [catShow, setCatShow] = useState(false);
  const onCatShow = () => setCatShow(true);
  const onCatClose = () => setCatShow(false);

  // SubCategory Modal
  const [subShow, setSubShow] = useState(false);
  const onSubShow = () => setSubShow(true);
  const onSubClose = () => setSubShow(false);

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
                    step='0.01'
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
              {!isMatchUnit && (
                <p className="mt-2 error">
                  <FaExclamationTriangle className="mx-2" />
                  Đơn vị đã chọn không tương ứng với Đơn vị của Hạng mục con
                </p>
              )}
            </Form.Group>

            <Form.Group className='mb-3'>
              <Row>
                <Col className='ps-0'>
                  <div className='d-flex justify-content-between'>
                    <Form.Label style={{ fontWeight: 'bold' }}>
                      Hạng mục
                    </Form.Label>
                    <div className='tag' onClick={() => {
                      onCatShow(); onClose();
                    }}>
                      Tạo mới
                    </div>
                  </div>
                  <Form.Select
                    default-value={-1}
                    onChange={(event) => getAllParentFood(event)}
                  >
                    <option value={-1}>-</option>
                    {Object.keys(allCategories).length > 0 && allCategories.categories.map((category, idx) => (
                      <option value={category.id} key={idx}>
                        {category.name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>

                <Col className='pe-0'>
                  <div className='d-flex justify-content-between'>
                    <Form.Label style={{ fontWeight: 'bold' }}>
                      Hạng mục con
                    </Form.Label>
                    <div className='tag' onClick={() => {
                      onSubShow(); onClose();
                    }}>
                      Tạo mới
                    </div>
                  </div>
                  <Form.Select
                    default-value={-1}
                    {...register('parentFood')}
                    disabled={getValues('category') === -1}
                  >
                    <option value={-1}>-</option>
                    {Object.keys(allParentFood).length > 0 && allParentFood.products.map((parentOption, idx) => (
                      <option value={parentOption.id} key={idx}>
                        {parentOption.name} ({getUnit(parentOption.unit)})
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>
              {errors.parentFood && errors.parentFood.type === 'min' && (
                <p className="mt-2 error">
                  <FaExclamationTriangle className="mx-2" />
                  Bạn chưa phân loại Thực phẩm
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
      <CategoryModal
        foodModal={{ food }} onFoodShow={onShow}
        show={catShow} onShow={onCatShow} onClose={onCatClose}
      />
      <SubCategoryModal
        foodModal={{ food }} onFoodShow={onShow}
        show={subShow} onShow={onSubShow} onClose={onSubClose}
      />
    </>
  )
};

export default FoodModal;