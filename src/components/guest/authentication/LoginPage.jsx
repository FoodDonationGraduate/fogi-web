// Essentials
import {useState} from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Container, Form, Row, Stack } from 'react-bootstrap';
import { useDispatch } from 'react-redux'

// Form handling
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

// Components
import Logo from 'components/common/Logo';
import {login} from 'components/redux/reducer/AuthenticationReducer.jsx'
import InfoModal from 'components/layout/InfoModal'

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
      .required('Password is required')
      .min(8, "Password must contain at least 8 characters")
      // .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,32}$/, "Password must contain at least 1 letter, 1 number and 1 special character")
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  const [ failAuthentication, setFailAuthentication ] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    setFailAuthentication(false);
    dispatch(login(data, navigate, setFailAuthentication))
  };
 
  return (
    <Container fluid className='fogi-bg authen-bg authen-bg-user'>
      <Row className='py-4 d-flex justify-content-center align-items-center'>
        <Col md={8} lg={6} xl={4}>
          <Card className='shadow'>
            <Card.Body>
              <div className='mb-3 mt-md-4 mx-4'>
                <Stack className='mb-4' direction='horizontal' gap={4}>
                  <Logo usertype={0} />
                  <Stack direction='vertical'>
                    <h2 className='fw-bold'>
                      Đăng nhập
                    </h2>
                    <p className='text-secondary mb-0'>
                      Chưa có tài khoản?{' '}
                      <a href='/accounttype' className='fogi fw-bold'>
                        Đăng ký ngay!
                      </a>
                    </p>
                  </Stack>
                </Stack>
                <div className='mb-3'>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className='mb-3'>
                      <Form.Label className='text-center' style={{ fontWeight: 'bold' }}>
                        Email
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="name@example.com"
                        {...register("email")}
                      />
                      {errors.email && errors.email.type === "required" && (
                        <p className="mt-2 error">
                          <FaExclamationTriangle className="mx-2" />
                          Bạn chưa nhập Email
                        </p>
                      )}
                    </Form.Group>

                    <Form.Group className='mb-3'>
                      <Form.Label className='text-center' style={{ fontWeight: 'bold' }}>
                        Mật khẩu
                      </Form.Label>
                      <Form.Control type="password" {...register("password")} />
                      {errors.password && errors.password.type === "required" && (
                        <p className="mt-2 error">
                          <FaExclamationTriangle className="mx-2" />
                          Bạn chưa nhập mật khẩu
                        </p>
                      )}
                    </Form.Group>
                    { failAuthentication && 
                      <div className='text-center'>
                        <p className='fw-bold text-danger text-decoration-none'>
                          Email hoặc mật khẩu chưa đúng
                        </p>
                      </div> 
                    }
                    <div className='mb-3 text-end'>
                      <a href='/forgotpassword' className='fogi fw-bold'>
                        Quên mật khẩu?
                      </a>
                    </div>

                    <div className='d-grid'>
                      <Button className='fogi' variant='primary' type='submit'>
                        Đăng nhập
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
      <InfoModal />
    </Container>
  );
};

export default Login;
