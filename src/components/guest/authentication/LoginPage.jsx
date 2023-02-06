// Essentials
import * as React from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

// Form handling
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

// Assets imports
import { FaExclamationTriangle } from "react-icons/fa";
import Facebook from "../../../assets/images/facebook.svg";
import Google from "../../../assets/images/google.svg";

// Style imports
import './Authentication.css';
import '../../../assets/css/index.css';

const Login = () => {
  const formSchema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required')
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = () => {
    console.log('login');
  };
 
  return (
    <Container fluid className='authen-bg authen-bg-1'>
      <Row className='vh-100 d-flex justify-content-center align-items-center'>
        <Col lg={4}>
          <Card className='shadow'>
            <Card.Body>
              <div className='mb-3 mt-md-4 mx-4'>
                <Row className='mb-4'>
                  <Col lg={3}>
                    <div className='logo' />
                  </Col>
                  <Col>
                    <h2 className='fw-bold'>
                      Login
                    </h2>
                    <p className='text-secondary mb-0'>
                      New to Fogi?{' '}
                      <a className='authen fw-bold'>
                        Sign up
                      </a>
                    </p>
                  </Col>
                </Row>
                <div className='mb-3'>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className='mb-3'>
                      <Form.Label className='text-center' style={{ fontWeight: 'bold' }}>
                        Email address
                      </Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="name@example.com"
                        {...register("email")}
                      />
                      {errors.email && errors.email.type === "required" && (
                        <p className="mt-2 error">
                          <FaExclamationTriangle className="mx-2" />
                          Email is required
                        </p>
                      )}
                    </Form.Group>

                    <Form.Group className='mb-3'>
                      <Form.Label className='text-center' style={{ fontWeight: 'bold' }}>
                        Password
                      </Form.Label>
                      <Form.Control type="password" {...register("password")} />
                    {errors.password && errors.password.type === "required" && (
                      <p className="mt-2 error">
                        <FaExclamationTriangle className="mx-2" />
                        Password is required
                      </p>
                    )}
                    </Form.Group>
                    <div className='mb-3 text-end'>
                      <a className='authen fw-bold'>
                        Forgot password
                      </a>
                    </div>

                    <div className='d-grid'>
                      <Button className='authen' variant='primary' type='submit'>
                        Login
                      </Button>
                    </div>
                  </Form>
                  
                  <hr />
                  
                  <Row lg={2}>
                    <Col className='d-grid'>
                      <Button
                        variant='outline-secondary'
                      >
                        <img className='me-2' src={Facebook} width='24px' height='24px' alt='facebook' />
                        Facebook
                      </Button>
                    </Col>
                    <Col className='d-grid'>
                      <Button
                        variant='outline-secondary'
                      >
                        <img className='me-2' src={Google} width='24px' height='24px' alt='google' />
                        Google
                      </Button>
                    </Col>
                  </Row>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
