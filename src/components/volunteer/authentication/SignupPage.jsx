// Essentials
import * as React from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";

// Form handling
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

// Components
import Logo from 'components/common/Logo';
import { signupUserAccount } from 'components/redux/reducer/AuthenticationReducer';

// Assets imports
import { FaExclamationTriangle } from "react-icons/fa";

// Style imports
import 'assets/css/Authentication.css';
import 'assets/css/Fogi.css';

const Signup = () => {
  const formSchema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
    phonenumber: Yup.string().required(''),
    password: Yup.string()
      .required('Password is required')
      .min(8, "Password must contain at least 8 characters")     
      .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,32}$/, "Password must contain at least 1 letter, 1 number and 1 special character"),
    confirm: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password")], "Password does not match")
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    dispatch(signupUserAccount(data))
    navigate('/volunteer/accountinfo')
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
                    <Logo usertype={2} />
                  </Col>
                  <Col>
                    <h2 className='fw-bold'>
                      Sign up
                    </h2>
                    <p className='text-secondary mb-0'>
                      Already have an account?{' '}
                      <a href='/volunteer/login' className='fogi fw-bold'>
                        Login
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
                        Phone number
                      </Form.Label>
                      <Form.Control
                        type='number'
                        {...register("phonenumber")}
                      />
                      {errors.phonenumber && errors.phonenumber.type === "required" && (
                        <p className="mt-2 error">
                          <FaExclamationTriangle className="mx-2" />
                          Phone number is required
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
                      {errors.password && errors.password.type === "min" && (
                        <p className="mt-2 error">
                          <FaExclamationTriangle className="mx-2" />
                          Password must contain at least 8 characters
                        </p>
                      )}
                      {errors.password && errors.password.type === "matches" && (
                        <p className="mt-2 error">
                          <FaExclamationTriangle className="mx-2" />
                          Password must contain at least 1 letter, 1 number and 1 special character
                        </p>
                      )}
                    </Form.Group>

                    <Form.Group className='mb-3'>
                      <Form.Label className='text-center' style={{ fontWeight: 'bold' }}>
                        Confirm Password
                      </Form.Label>
                      <Form.Control type="password" {...register("confirm")} />
                    {errors.confirm && errors.confirm.type === "required" && (
                      <p className="mt-2 error">
                        <FaExclamationTriangle className="mx-2" />
                        You must re-enter your password here
                      </p>
                    )}
                    {errors.confirm && errors.confirm.type === "oneOf" && (
                      <p className="mt-2 error">
                        <FaExclamationTriangle className="mx-2" />
                        Password does not match
                      </p>
                    )}
                    </Form.Group>

                    <div className='d-grid'>
                      <Button className='fogi' variant='primary' type='submit'>
                        Continue
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

export default Signup;
