// Essentials
import React, { useState, useEffect, useRef } from 'react';
import {
  Button, Col, Form,
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
import { postNewProduct } from 'components/redux/reducer/ProductReducer';
import { setModalMessage, showModal } from 'components/redux/reducer/ModalReducer';
import Select from 'react-select';

// Assets imports
import { FaExclamationTriangle } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';

// Reducers
import { retrieveAllParentFood, setAllParentFood } from 'components/redux/reducer/DirectorReducer';
import { retrieveAllCategories } from 'components/redux/reducer/CategoryReducer';

// Style imports
import 'assets/css/Authentication.css';

const PostProductModal = ({
  show,
  onClose
}) => {
  const userInfo = useSelector(state => state.authenticationReducer.user);
  const userToken = useSelector(state => state.authenticationReducer.token);
  const allParentFood = useSelector(state => state.directorReducer.allParentFood);
  const allCategories = useSelector(state => state.categoryReducer.allCategories);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isMatchUnit, setIsMatchUnit] = useState(true);

  // Form handling
  const formSchema = Yup.object().shape({
    name: Yup.string().required(''),
    description: Yup.string().required(''),
    expired_time: Yup.string().required(''),
    stock: Yup.number().required(''),
    unit: Yup.string().required(''),
    category: Yup.number().required().min(0),
    parentFood: Yup.number().required().min(0)
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, getValues, setValue, handleSubmit, formState, reset } = useForm(formOptions);
  const { errors } = formState;
  const parentRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    reset({ category: -1 });
  }, []);

  // Image handling
  const imageOnly = 'image/png, image/gif, image/jpeg';
  const [images, setImages] = useState([]);
  const [base64Images, setBase64Images] = useState([]);
  const removeImageAtIdx = (idx) => {
    const newImages = new DataTransfer();
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      if (idx !== i) {
        newImages.items.add(image);
      }
    }
    setImages(newImages.files);
  };

  // Submit
  const onSubmit = (data) => {
    if (data.unit !== allParentFood.products.find(f => f.id === data.parentFood).unit) {
      setIsMatchUnit(false);
      return;
    }
    setIsMatchUnit(true);

    console.log('post item');
    if (images.length === 0) {
      dispatch(setModalMessage('Bạn cần phải đính kèm hình ảnh thực phẩm'));
      dispatch(showModal());
      return;
    }
    data.expired_time = data.expired_time.split('T')[0] + ' 23:59:59';
    console.log(data)
    dispatch(postNewProduct({...data, images: base64Images}, {userInfo, userToken}, navigate));
    reset({
      name: '',
      description: '',
      expired_time: '',
      stock: null,
      unit: 'item',
      category: -1,
      parentFood: -1
    });
    setImages([]);
    setSubmitted(false);
    onClose();
  };

  useEffect(() => {
    dispatch(retrieveAllCategories({}, navigate));
    dispatch(setAllParentFood({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setValue('parentFood', -1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getValues('category')]);

  const getAllParentFood = (value) => {
    const category_id = value.value;
    setValue('category', category_id);
    setValue('parentFood', null);
    parentRef.current.setValue(null);
    dispatch(retrieveAllParentFood({ category_ids: JSON.stringify([Number(category_id)]), limit: 100, offset: 0 }, { userInfo, userToken }, navigate));
  };

  useEffect(() => {
    var newImages = [];
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const reader = new FileReader();
      reader.onload = function () {
        var base64String = reader.result.replace("data:", "")
            .replace(/^.+,/, "");
        newImages.push(base64String);
      }
      reader.readAsDataURL(image);
    }
    setBase64Images(newImages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  return (
    <>
      <Modal
        show={show}
        onHide={onClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thêm thực phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={handleSubmit(onSubmit)}
          >
            
            <Form.Group className='mb-3'>
              <Form.Label style={{ fontWeight: 'bold' }}>
                Tên thực phẩm
              </Form.Label>
              <Form.Control {...register('name')} />
              {errors.name && errors.name.type === 'required' && (
                <p className="mt-2 error">
                  <FaExclamationTriangle className="mx-2" />
                  Bạn chưa điền tên thực phẩm
                </p>
              )}
            </Form.Group>
            
            <Form.Group className='mb-3'>
              <Form.Label style={{ fontWeight: 'bold' }}>
                Ngày hết hạn
              </Form.Label>
              <Form.Control type='date' min={new Date((new Date()).setDate((new Date()).getDate() + 2)).toISOString().split('T')[0]} {...register('expired_time')} />
              {errors.expired_time && errors.expired_time.type === 'required' && (
                <p className="mt-2 error">
                  <FaExclamationTriangle className="mx-2" />
                  Bạn chưa điền ngày hết hạn
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
                    step='0.01' min={0}
                    {...register('stock')}
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
                    {...register('unit')} >
                    <option value='item'>Cái</option>
                    <option value='kg'>Kilogram</option>
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
                  </div>
                  <Select 
                    options={Object.keys(allCategories).length > 0 && allCategories.categories.map((category) => {
                      return {
                        value: category.id, label: category.name
                      }
                    })}
                    menuPlacement='auto'
                    onChange={(value) => { getAllParentFood(value) }} 
                  />
                </Col>

                <Col className='pe-0'>
                  <div className='d-flex justify-content-between'>
                    <Form.Label style={{ fontWeight: 'bold' }}>
                      Hạng mục con
                    </Form.Label>
                  </div>
                  <Select 
                    {...register('parentFood')}
                    options={Object.keys(allParentFood).length > 0 && allParentFood.products.map((parentOption) => {
                      return {
                        value: parentOption.id, label: parentOption.name
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
            
            <Form.Group className='mb-3'>
              <Form.Label style={{ fontWeight: 'bold' }}>
                Mô tả
              </Form.Label>
              <Form.Control as='textarea' {...register('description')} />
            </Form.Group>
            
            <Form.Group className='mb-3'>
              <Form.Label style={{ fontWeight: 'bold' }}>
                Hình thực phẩm{' '}
                <Tooltip tip={'Ít nhất 1 hình ảnh'} />
              </Form.Label>
              <UploadButton
                label='Upload'
                type={imageOnly}
                setValue={setImages}
                allowMultiple={true}
              />
              <div className='mt-2'>
                {images && Array.from({ length: images.length }).map((_, idx) => (
                  <Stack className='upload-tag' direction='horizontal' key={idx}>
                    {idx}_{images[idx].name}
                    <MdClose
                      className='upload-tag-close'
                      onClick={() => {
                        removeImageAtIdx(idx);
                      }}
                    />
                  </Stack>
                ))}
              </div>
              {submitted && images.length === 0 && (
                <p className="mt-2 error">
                  <FaExclamationTriangle className="mx-2" />
                  Bạn chưa đăng hình ảnh thực phẩm
                </p>
              )}
            </Form.Group>

            <div className='d-grid'>
              <Button
                className='fogi'
                variant='primary'
                type='submit'
                onClick={() => { setSubmitted(true); }}
              >
                Thêm thực phẩm
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PostProductModal;
