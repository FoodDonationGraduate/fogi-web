// Essentials
import {useState} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import {getUserInfo, getUserToken} from 'components/redux/reducer/AuthenticationReducer.jsx'
import axiosInstance from "services/axios/axiosConfig.js";

// Form handling
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

// Assets imports
import { FaExclamationTriangle } from "react-icons/fa";
import Facebook from "assets/images/facebook.svg";
import Google from "assets/images/google.svg";

// Style imports
import 'assets/css/Authentication.css';
import 'assets/css/Fogi.css';


const Login = () => {
  const formSchema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required')
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  const [ failAuthentication, setFailAuthentication ] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    setFailAuthentication(false);
    axiosInstance.post(`/login`, {
      email: data.email,
      password: data.password
    }).then((res) => {
        dispatch(getUserInfo(res.data.user))
        dispatch(getUserToken(res.data.token))
        navigate('/profile')
    }).catch((err) => {
        setFailAuthentication(true);
        console.log(err)
    });
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
                    <div className='logo' />
                  </Col>
                  <Col>
                    <h2 className='fw-bold'>
                      Login
                    </h2>
                    <p className='text-secondary mb-0'>
                      New to Fogi?{' '}
                      <a href='/signup' className='fogi fw-bold'>
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
                    { failAuthentication && 
                      <div className='text-center'>
                        <a className='fw-bold text-danger text-decoration-none'>
                          Wrong username or password
                        </a>
                      </div> 
                    }
                    <div className='mb-3 text-end'>
                      <a className='fogi fw-bold'>
                        Forgot password
                      </a>
                    </div>

                    <div className='d-grid'>
                      <Button className='fogi' variant='primary' type='submit'>
                        Login
                      </Button>
                    </div>
                  </Form>
                  
                  <hr />
                  
                  <Row lg={2}>
                    <Col className='d-grid ps-0'>
                      <Button
                        variant='outline-secondary'
                      >
                        <img className='me-2' src={Facebook} width='24px' height='24px' alt='facebook' />
                        Facebook
                      </Button>
                    </Col>
                    <Col className='d-grid pe-0'>
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
