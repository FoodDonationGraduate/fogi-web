// Essentials
import * as React from 'react';
import { useState } from 'react';
import {
  Button, Col, Dropdown, DropdownButton, Form, InputGroup,
  Modal, Row, Stack
} from 'react-bootstrap';

// Form handling
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

// Components
import UploadButton from 'components/common/UploadButton';
import Tooltip from 'components/common/Tooltip';

// Assets imports
import { FaExclamationTriangle } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';

// Style imports
import 'assets/css/Authentication.css';

const PostProductModal = ({
  show,
  onClose
}) => {
  // Form handling
  const formSchema = Yup.object().shape({
    productName: Yup.string().required(''),
    price: Yup.string().required(''),
    expireDate: Yup.string().required(''),
    remain: Yup.string().required('')
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

  // Remaining number
  const [unit, setUnit] = useState('Portion');
  const onUnitSelect = (eventKey) => {
    setUnit(eventKey);
  };

  // Image handling
  const imageOnly = 'image/png, image/gif, image/jpeg';
  const [images, setImages] = useState([]);
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
    console.log(JSON.stringify(data));
    setSubmitted(true);
    onClose();
  };

  return (
    <>
      <Modal
        show={show}
        onHide={onClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Post Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            
            <Form.Group className='mb-3'>
              <Form.Label style={{ fontWeight: 'bold' }}>
                Product name
              </Form.Label>
              <Form.Control {...register('productName')} />
              {errors.productName && errors.productName.type === 'required' && (
                <p className="mt-2 error">
                  <FaExclamationTriangle className="mx-2" />
                  Product name is required
                </p>
              )}
            </Form.Group>
            
            <Form.Group className='mb-3'>
              <Form.Label style={{ fontWeight: 'bold' }}>
                Price{' '}
                <Tooltip tip={"'000' will be added at the end automatically"} />
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type='number'
                  value={price}
                  {...register('price')}
                  onChange={(event) => onChangePrice(event.target.value)}
                />
                <InputGroup.Text>VND</InputGroup.Text>
              </InputGroup>
              {errors.price && errors.price.type === 'required' && (
                <p className="mt-2 error">
                  <FaExclamationTriangle className="mx-2" />
                  Product price is required
                </p>
              )}
            </Form.Group>
            
            <Form.Group className='mb-3'>
              <Form.Label style={{ fontWeight: 'bold' }}>
                Expired date
              </Form.Label>
              <Form.Control type='date' {...register('expireDate')} />
              {errors.expireDate && errors.expireDate.type === 'required' && (
                <p className="mt-2 error">
                  <FaExclamationTriangle className="mx-2" />
                  Expiration date is required
                </p>
              )}
            </Form.Group>
            
            <Form.Group className='mb-3'>
              <Form.Label style={{ fontWeight: 'bold' }}>
                Remaining number
              </Form.Label>
              <Row>
                <Col className='ps-0' sm={8} md={8} lg={8}>
                  <Form.Control
                    type='number' {...register('remain')}
                  />
                </Col>
                <Col className='px-0' sm={4} md={4} lg={4}>
                  <DropdownButton
                    className='d-grid'
                    variant='outline-secondary'
                    title={unit}
                    onSelect={(eventKey) => {
                      onUnitSelect(eventKey);
                    }}
                  >
                    <Dropdown.Item eventKey='Portion'>Portion</Dropdown.Item>
                    <Dropdown.Item eventKey='Kilogram'>Kilogram</Dropdown.Item>
                  </DropdownButton>
                </Col>
              </Row>
              {errors.remain && errors.remain.type === 'required' && (
                <p className="mt-2 error">
                  <FaExclamationTriangle className="mx-2" />
                  Remaining number is required
                </p>
              )}
            </Form.Group>
            
            <Form.Group className='mb-3'>
              <Form.Label style={{ fontWeight: 'bold' }}>
                Description
              </Form.Label>
              <Form.Control as='textarea' {...register('description')} />
            </Form.Group>
            
            <Form.Group className='mb-3'>
              <Form.Label style={{ fontWeight: 'bold' }}>
                Product Images{' '}
                <Tooltip tip={"At least 1 image is required"} />
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
                  At least 1 image is required
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
                Post Product
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PostProductModal;
