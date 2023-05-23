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

const PostProductModal = ({
  show,
  onClose
}) => {
  const userInfo = useSelector(state => state.authenticationReducer.user)
  const userToken = useSelector(state => state.authenticationReducer.token)
  const allCategories = useSelector(state => state.categoryReducer.allCategories);

  // Form handling
  const formSchema = Yup.object().shape({
    name: Yup.string().required(''),
    category_id: Yup.string().required(''),
    description: Yup.string().required(''),
    expired_time: Yup.string().required(''),
    stock: Yup.number().required(''),
    unit: Yup.string().required(''),
    available_start: Yup.string().required(''),
    available_end: Yup.string().required('')
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  const [submitted, setSubmitted] = useState(false);

  // Price handling
  const [price, setPrice] = useState(0);
  const onChangePrice = (val) => {
    if (Number(val) === 0) {
      setPrice(val.substring(0, 1));
    } else if (val.length === 1) {
      setPrice(Number(val) * 1000);
    } else {
      if (val.length > String(price).length) {
        let temp = val.substring(0, val.length - 4);
        let tail = val.substring(val.length - 1, val.length);
        setPrice(Number(temp + tail) * 1000);
      }
      if (val.length < String(price).length) {
        let temp = val.substring(0, val.length - 3);
        setPrice(Number(temp) * 1000);
      }
    }
  };

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

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Submit
  const onSubmit = (data) => {
    console.log('post item');
    if (images.length === 0) {
      return;
    }
    dispatch(postNewProduct({...data, images: base64Images}, {userInfo, userToken}, navigate));
    onClose();
  };

  React.useEffect(() => {
    dispatch(retrieveAllCategories(navigate));
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
  }, [images])
  return (
    <>
      <Modal
        show={show}
        onHide={onClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thêm món ăn</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            
            <Form.Group className='mb-3'>
              <Form.Label style={{ fontWeight: 'bold' }}>
                Tên món ăn
              </Form.Label>
              <Form.Control {...register('name')} />
              {errors.name && errors.name.type === 'required' && (
                <p className="mt-2 error">
                  <FaExclamationTriangle className="mx-2" />
                  Bạn chưa điền tên món ăn
                </p>
              )}
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label style={{ fontWeight: 'bold' }}>
                Danh mục
              </Form.Label>
              <Form.Select aria-label="Default select exampe" {...register('category_id')} >
                {Object.keys(allCategories).length !== 0 && allCategories.categories.map((category) => (<option value={category.id}>{category.name}</option>))}
              </Form.Select>
              {errors.name && errors.name.type === 'required' && (
                <p className="mt-2 error">
                  <FaExclamationTriangle className="mx-2" />
                  Bạn chưa chọn danh mục món ăn
                </p>
              )}
            </Form.Group>
            
            <Form.Group className='mb-3'>
              <Form.Label style={{ fontWeight: 'bold' }}>
                Ngày hết hạn
              </Form.Label>
              <Form.Control type='date' {...register('expired_time')} />
              {errors.expired_time && errors.expired_time.type === 'required' && (
                <p className="mt-2 error">
                  <FaExclamationTriangle className="mx-2" />
                  Bạn chưa điền ngày hết hạn
                </p>
              )}
            </Form.Group>
            
            <Form.Group className='mb-3'>
              
              <Row>
                <Col className='ps-0' sm={6} md={6} lg={6}>
                  <Form.Label style={{ fontWeight: 'bold' }}>
                    Thời gian bắt đầu
                  </Form.Label>
                  <Form.Control
                    type='time' {...register('available_start')}
                  />
                  {errors.available_start && errors.available_start.type === 'required' && (
                    <p className="mt-2 error">
                      <FaExclamationTriangle className="mx-2" />
                      Bạn chưa nhập thời gian bắt đầu
                    </p>
                  )}
                </Col>
                <Col className='px-0' sm={6} md={6} lg={6}>
                  <Form.Label style={{ fontWeight: 'bold' }}>
                    Thời gian kết thúc
                  </Form.Label>
                  <Form.Control
                    type='time' {...register('available_end')}
                  />
                  {errors.available_end && errors.available_end.type === 'required' && (
                    <p className="mt-2 error">
                      <FaExclamationTriangle className="mx-2" />
                      Bạn chưa nhập thời gian kết thúc
                    </p>
                  )}
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label style={{ fontWeight: 'bold' }}>
                Số lượng
              </Form.Label>
              <Row>
                <Col className='ps-0' sm={8} md={8} lg={8}>
                  <Form.Control
                    type='number' {...register('stock')}
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
                    <option value='cái'>Cái</option>
                    <option value='kg'>Kilogram</option>
                  </Form.Select>
                </Col>
              </Row>
            </Form.Group>
            
            <Form.Group className='mb-3'>
              <Form.Label style={{ fontWeight: 'bold' }}>
                Mô tả
              </Form.Label>
              <Form.Control as='textarea' {...register('description')} />
            </Form.Group>
            
            <Form.Group className='mb-3'>
              <Form.Label style={{ fontWeight: 'bold' }}>
                Hình món ăn{' '}
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
                  <Stack className='upload-tag' direction='horizontal'>
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
                  Bạn chưa đăng hình ảnh món ăn
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
                Thêm món ăn
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PostProductModal;
