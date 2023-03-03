// Essentials
import * as React from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";

// Form handling
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

// Assets imports
import { FaExclamationTriangle } from "react-icons/fa";
import { ReactComponent as Logo } from 'assets/images/logo.svg';

// Style imports
import '../../../assets/css/Authentication.css';
import '../../../assets/css/Fogi.css';
import { signup, signupUserInfo } from 'components/redux/reducer/AuthenticationReducer';

const AccountInfo = () => {
  const registeredUser = useSelector(state => state.authenticationReducer.registeredUser)

  const formSchema = Yup.object().shape({
    fullname: Yup.string().required(''),
    dob: Yup.string().required(''),
    phonenumber: Yup.string().required(''),
    address: Yup.string().required('')
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await dispatch(signupUserInfo(data))
    dispatch(signup(JSON.parse(localStorage.getItem("registeredUser")), navigate))  
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
                    <Logo fill='#82CD47' />
                  </Col>
                  <Col>
                    <h2 className='fw-bold'>
                      Account Information
                    </h2>
                  </Col>
                </Row>
                <div className='mb-3'>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className='mb-3'>
                      <Form.Label className='text-center' style={{ fontWeight: 'bold' }}>
                        Full name
                      </Form.Label>
                      <Form.Control {...register("fullname")} />
                      {errors.fullname && errors.fullname.type === "required" && (
                        <p className="mt-2 error">
                          <FaExclamationTriangle className="mx-2" />
                          Full name is required
                        </p>
                      )}
                    </Form.Group>

                    <Form.Group className='mb-3'>
                      <Form.Label className='text-center' style={{ fontWeight: 'bold' }}>
                        Date of birth
                      </Form.Label>
                      <Form.Control
                        type='date'
                        placeholders='Select Date of Birth'
                        {...register("dob")}
                      />
                      {errors.dob && errors.dob.type === "required" && (
                        <p className="mt-2 error">
                          <FaExclamationTriangle className="mx-2" />
                          Date of Birth is required
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
                        Address
                      </Form.Label>
                      <Form.Control {...register("address")} />
                      {errors.address && errors.address.type === "required" && (
                        <p className="mt-2 error">
                          <FaExclamationTriangle className="mx-2" />
                          Address is required
                        </p>
                      )}
                    </Form.Group>

                    <div className='d-grid'>
                      <Button className='fogi' variant='primary' type='submit'>
                        Sign up
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
