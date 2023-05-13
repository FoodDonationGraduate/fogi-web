// Essentials
import * as React from 'react';
import { Button, Card, Col, Container, Form, Row, Stack } from 'react-bootstrap';
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router';
import { useNavigate } from "react-router-dom";

// Form handling
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

// Assets imports
import { FaExclamationTriangle } from "react-icons/fa";

// Style imports
import 'assets/css/Authentication.css';
import 'assets/css/Fogi.css';

// Components
import Logo from 'components/common/Logo';
import { setModalMessage, showModal } from 'components/redux/reducer/ModalReducer';
import Modal from "components/layout/InfoModal.jsx";
import { resetPassword } from 'components/redux/reducer/AuthenticationReducer';

const ChangePassword = () => {
  const formSchema = Yup.object().shape({
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

  const search = useLocation().search;
  const token = new URLSearchParams(search).get('token');
  const email = new URLSearchParams(search).get('email');

  const onSubmit = (data) => {
    if (token && email) {
      dispatch(resetPassword({token, email, password: data.password}, navigate))
    } else {
      dispatch(setModalMessage('We cannot find your email and token in url'))
      dispatch(showModal())
    }
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
                      Đổi mật khẩu
                    </h2>
                    <p className='text-secondary mb-0'>
                      Nhập mật khẩu mới của bạn
                    </p>
                  </Stack>
                </Stack>
                <div className='mb-3'>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className='mb-3'>
                      <Form.Label className='text-center' style={{ fontWeight: 'bold' }}>
                        Mật khẩu mới
                      </Form.Label>
                      <Form.Control type="password" {...register("password")} />
                    {errors.password && errors.password.type === "required" && (
                      <p className="mt-2 error">
                        <FaExclamationTriangle className="mx-2" />
                        Bạn chưa nhập mật khẩu mới
                      </p>
                    )}
                    {errors.password && errors.password.type === "min" && (
                      <p className="mt-2 error">
                        <FaExclamationTriangle className="mx-2" />
                        Mật khẩu phải chứa ít nhất 8 ký tự
                      </p>
                    )}
                    {errors.password && errors.password.type === "matches" && (
                      <p className="mt-2 error">
                        <FaExclamationTriangle className="mx-2" />
                        Mật khẩu phải chứa ít nhất 1 chữ, 1 số và 1 ký tự đặc biệt
                      </p>
                    )}
                    </Form.Group>

                    <Form.Group className='mb-3'>
                      <Form.Label className='text-center' style={{ fontWeight: 'bold' }}>
                        Nhập lại mật khẩu mới
                      </Form.Label>
                      <Form.Control type="password" {...register("confirm")} />
                    {errors.confirm && errors.confirm.type === "required" && (
                      <p className="mt-2 error">
                        <FaExclamationTriangle className="mx-2" />
                        Bạn chưa nhập mật khẩu mới
                      </p>
                    )}
                    {errors.confirm && errors.confirm.type === "oneOf" && (
                      <p className="mt-2 error">
                        <FaExclamationTriangle className="mx-2" />
                        Mật khẩu không trùng khớp
                      </p>
                    )}
                    </Form.Group>

                    <div className='d-grid'>
                      <Button className='fogi' variant='primary' type='submit'>
                        Đặt lại mật khẩu
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Modal />
    </Container>
  );
};

export default ChangePassword;
