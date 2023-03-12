// Essentials
import * as React from 'react';
import { useState } from 'react';
import {
  Button, Col, Dropdown, DropdownButton, Form, InputGroup,
  OverlayTrigger, Modal, Row, Tooltip
} from 'react-bootstrap';

// Form handling
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

// Assets imports
import { FaExclamationTriangle, FaExclamationCircle } from "react-icons/fa";

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
    remain: Yup.string().required(''),
    description: Yup.string().required('')
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  // Tool tips
  const priceTooltip = (props) => (
    <Tooltip {...props}>'000' will be added automatically at the end</Tooltip>
  );

  // Remaining number Unit handling
  const [unit, setUnit] = useState('Portion');
  const onUnitSelect = (eventKey) => {
    setUnit(eventKey);
  };

  // Submit
  const onSubmit = (data) => {
    console.log('post product');
    onClose();
  };

  const [price, setPrice] = useState(0);
  const onChangePrice = (val) => {
    if (Number(val) === 0) {
      setPrice(val.substring(0, 1));
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
              <OverlayTrigger
                placement='right'
                overlay={priceTooltip}
              >
                <span>
                  <FaExclamationCircle className='mb-1' />
                </span>
              </OverlayTrigger>
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

          <div className='d-grid'>
            <Button className='fogi' variant='primary' type='submit'>
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
