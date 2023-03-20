// Essentials
import * as React from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
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
        <Col lg={4}>
          <Card className='shadow'>
            <Card.Body>
              <div className='mb-3 mt-md-4 mx-4'>
                <Row className='mb-4'>
                  <Col lg={3}>
                    <Logo usertype={0} />
                  </Col>
                  <Col>
                    <h2 className='fw-bold'>
                      Change Password
                    </h2>
                    <p className='text-secondary mb-0'>
                      Enter your new password
                    </p>
                  </Col>
                </Row>
                <div className='mb-3'>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className='mb-3'>
                      <Form.Label className='text-center' style={{ fontWeight: 'bold' }}>
                        New Password
                      </Form.Label>
                      <Form.Control type="password" {...register("password")} />
                    {errors.password && errors.password.type === "required" && (
                      <p className="mt-2 error">
                        <FaExclamationTriangle className="mx-2" />
                        New password is required
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
                        Confirm New Password
                      </Form.Label>
                      <Form.Control type="password" {...register("confirm")} />
                    {errors.confirm && errors.confirm.type === "required" && (
                      <p className="mt-2 error">
                        <FaExclamationTriangle className="mx-2" />
                        You must re-enter your new password here
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
                        Submit
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
