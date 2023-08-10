// Essentials
import React, { useState, useEffect, useRef } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

// Assets
import { FaExclamationTriangle } from 'react-icons/fa';

// Components
import CategoryModal from '../category/CategoryModal';
import SubCategoryModal from '../parentFood/SubCategoryModal';
import Select from 'react-select';

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
  const categoryRef = useRef(null);
  const parentRef = useRef(null);

  const onOpen = () => {
    reset({
      name: food.name,
      stock: food.stock,
      unit: food.unit,
      category: food.donor_parent && food.donor_parent.category_name != 'Khác' ? Number(food.donor_parent.category_id) : -1,
      parentFood: food.donor_parent && food.donor_parent.name != 'Khác' ? Number(food.donor_parent.id) : -1
    });
    categoryRef.current.setValue(food.donor_parent && food.donor_parent.category_name != 'Khác' ? { value: food.donor_parent.category_id, label: food.donor_parent.category_name } : null);
    parentRef.current.setValue(food.donor_parent && food.donor_parent.name != 'Khác' ? { value: food.donor_parent.id, label: food.donor_parent.name } : null);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllParentFood = (value) => {
    if (!value) return;

    const category_id = value.value;
    setValue('category', category_id);
    setValue('parentFood', null);
    parentRef.current.setValue(null);
    dispatch(retrieveAllParentFood({ category_ids: JSON.stringify([Number(category_id)]) }, { userInfo, userToken }, navigate));
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
                  <Select 
                    options={Object.keys(allCategories).length > 0 && allCategories.categories.map((category) => {
                      return {
                        value: category.id, label: category.name
                      }
                    })}
                    menuPlacement='auto'
                    onChange={(value) => { getAllParentFood(value) }} 
                    ref={categoryRef}
                  />
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
                  <Select 
                    {...register('parentFood')}
                    options={Object.keys(allParentFood).length > 0 && allParentFood.products.map((parentOption) => {
                      return {
                        value: parentOption.id, label: `${parentOption.name}(${parentOption.unit == 'kg' ? 'Kg' : 'Cái'})`
                      }
                    })}
                    menuPlacement='auto'
                    onChange={(value) => { if (!value) return; setValue('parentFood', value.value); }}
                    isDisabled={getValues('category') < 0}
                    ref={parentRef}
                  />
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