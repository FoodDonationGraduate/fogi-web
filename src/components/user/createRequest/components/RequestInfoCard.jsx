// Essentials
import React from 'react';
import { Button, Container, Col, Form, Row, Stack } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

// Form handling
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

// Assets imports
import { FaExclamationTriangle } from 'react-icons/fa';

const RequestInfoCard = () => {
  const navigate = useNavigate(); 

  // Form handling
  const formSchema = Yup.object().shape({
    reason: Yup.string().required('')
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  
  const onSubmit = (data) => {
    console.log('create request');
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <div className='order-info-card'>
              <h3 className='order-item-date'>
                Yêu cầu tạo ngày 15/05/2023{/*convertToString(order.created_time, 'LocaleDateString')*/}
              </h3>
              <header className='order-item-secondary'>
                Tại 227 Nguyen Van Cu, P. 4, Q. 5, TP. Ho chi Minh{/*order.address*/}
              </header>
              
              <Form className='mt-4' onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className='mb-3'>
                  <Form.Label style={{ fontWeight: 'bold' }}>
                    Lí do đặt các Món ăn
                  </Form.Label>
                  <Form.Control as='textarea' {...register('reason')} />
                  {errors.reason && errors.reason.type === 'required' && (
                    <p className="mt-2 error">
                      <FaExclamationTriangle className="mx-2" />
                      Bạn chưa điền lí do
                    </p>
                  )}
                </Form.Group>

                <Row className='mt-4'>
                  <Col className='d-flex justify-content-end'>
                    <Stack direction='horizontal' gap={2}>
                      <Button className='fogi' variant='primary' type='submit'>
                        Tạo Yêu cầu
                      </Button>
                      <Button variant='outline-secondary' onClick={() => navigate('/cart')}>
                        Quay về
                      </Button>
                    </Stack>
                  </Col>
                </Row>
              </Form>

            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RequestInfoCard;
