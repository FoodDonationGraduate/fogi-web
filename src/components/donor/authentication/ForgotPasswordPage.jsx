// Essentials
import {useState} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import {setUserInfo, setUserToken} from 'components/redux/reducer/AuthenticationReducer.jsx'
import axiosInstance from "services/axios/axiosConfig.js";

// Form handling
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

// Components
import Logo from 'components/common/Logo';

// Assets imports
import { FaExclamationTriangle } from "react-icons/fa";

// Style imports
import 'assets/css/Authentication.css';
import 'assets/css/Fogi.css';

const ForgotPassword = () => {
  const formSchema = Yup.object().shape({
    email: Yup.string().required('Email is required')
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log("siuuu");
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
                      Forgot Password
                    </h2>
                    <p className='text-secondary mb-0'>
                      Enter your email to receive the reset password link
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
                        type="text"
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

                    <div className='d-grid'>
                      <Button className='fogi' variant='primary' type='submit'>
                        Confirm
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

export default ForgotPassword;
