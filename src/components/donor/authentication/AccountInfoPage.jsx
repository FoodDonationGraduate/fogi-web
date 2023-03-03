// Essentials
import * as React from 'react';
import { Button, Card, Col, Container, Form, Row, Stack } from 'react-bootstrap';

// Form handling
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

// Components
import UploadButton from 'components/common/UploadButton';
import Logo from 'components/common/Logo';

// Assets imports
import { FaExclamationTriangle, FaQuestionCircle } from "react-icons/fa";

// Style imports
import 'assets/css/Authentication.css';
import 'assets/css/Form.css';
import 'assets/css/Fogi.css';

const AccountInfo = () => {
  const formSchema = Yup.object().shape({
    brandname: Yup.string().required(''),
    address: Yup.string().required(''),
    openhours: Yup.string().required(''),
    ownername: Yup.string().required('')
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = () => {
    console.log('login');
  };
 
  return (
    <Container fluid className='fogi-bg authen-bg authen-bg-user'>
      <Row className='py-4 d-flex justify-content-center align-items-center'>
        <Col lg={4}>
          <Card className='shadow'>
            <Card.Body>
              <div className='mb-3 mt-md-4 mx-4'>
                <Row className='mb-4'>
                  <Col lg={3}>
                    <Logo usertype={1} />
                  </Col>
                  <Col>
                    <h2 className='fw-bold'>
                      Account Information
                    </h2>
                  </Col>
                </Row>
                <div className='mb-3'>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <header className='form-header mb-3'>
                      Donor's Information
                    </header>
                    <Form.Group className='mb-3'>
                      <Form.Label className='text-center' style={{ fontWeight: 'bold' }}>
                        Brand name
                      </Form.Label>
                      <Form.Control {...register("brandname")} />
                      {errors.brandname && errors.brandname.type === "required" && (
                        <p className="mt-2 error">
                          <FaExclamationTriangle className="mx-2" />
                          Brand name is required
                        </p>
                      )}
                    </Form.Group>

                    <Form.Group className='mb-3'>
                      <Form.Label className='text-center' style={{ fontWeight: 'bold' }}>
                        Address
                      </Form.Label>
                      <Form.Control
                        {...register("address")}
                      />
                      {errors.address && errors.address.type === "required" && (
                        <p className="mt-2 error">
                          <FaExclamationTriangle className="mx-2" />
                          Address is required
                        </p>
                      )}
                    </Form.Group>

                    <Form.Group className='mb-3'>
                      <Form.Label className='text-center' style={{ fontWeight: 'bold' }}>
                        Open hours
                      </Form.Label>
                      <Form.Control {...register("openhours")} />
                      {errors.openhours && errors.openhours.type === "required" && (
                        <p className="mt-2 error">
                          <FaExclamationTriangle className="mx-2" />
                          Open hours is required
                        </p>
                      )}
                    </Form.Group>

                    <header className='form-header mb-3'>
                      Owner's Information
                    </header>
                    <Form.Group className='mb-3'>
                      <Form.Label className='text-center' style={{ fontWeight: 'bold' }}>
                        Owner's name
                      </Form.Label>
                      <Form.Control
                        {...register("ownername")}
                      />
                      {errors.ownername && errors.ownername.type === "required" && (
                        <p className="mt-2 error">
                          <FaExclamationTriangle className="mx-2" />
                          Owner's name is required
                        </p>
                      )}
                    </Form.Group>

                    <Form.Group className='mb-3'>
                      <Form.Label className='text-center' style={{ fontWeight: 'bold' }}>
                        Image of Identity Card/Passport
                      </Form.Label>
                      <Stack direction='horizontal' gap={2}>
                        <UploadButton label='Upload front side' />
                        <UploadButton label='Upload back side' />
                      </Stack>
                    </Form.Group>

                    <div className='d-grid'>
                      <Button className='fogi' variant='primary' type='submit'>
                        Continue
                      </Button>
                      <Button className='mt-2' variant='outline-secondary'>
                        Return
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AccountInfo;
