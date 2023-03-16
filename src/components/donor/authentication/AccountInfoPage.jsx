// Essentials
import * as React from 'react';
import { Button, Card, Col, Container, Form, Row, Stack } from 'react-bootstrap';
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";

// Form handling
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

// Components
import UploadButton from 'components/common/UploadButton';
import Logo from 'components/common/Logo';
import { signupForDonor, signupUserInfo } from 'components/redux/reducer/AuthenticationReducer';
import { setModalMessage, showModal } from 'components/redux/reducer/ModalReducer';
import Modal from "components/layout/Modal.jsx";

// Assets imports
import { FaExclamationTriangle } from "react-icons/fa";

// Style imports
import 'assets/css/Authentication.css';
import 'assets/css/Form.css';
import 'assets/css/Fogi.css';

const AccountInfo = () => {
  const imageOnly = 'image/png, image/gif, image/jpeg';
  const [frontImage, setFrontImage] = React.useState(undefined);
  const [backImage, setBackImage] = React.useState(undefined);
  const [owner_id_front, setFrontImgBase64] = React.useState('');
  const [owner_id_back, setBackImgBase64] = React.useState('');

  const formSchema = Yup.object().shape({
    brandname: Yup.string().required(''),
    description:  Yup.string().required(''),
    address: Yup.string().required(''),
    ownername: Yup.string().required('')
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (owner_id_front !== '' && owner_id_back !== '') {
      await dispatch(signupUserInfo(data))
      await dispatch(signupUserInfo({owner_id_front, owner_id_back}))
      console.log(JSON.parse(localStorage.getItem("registeredUser")))
      dispatch(signupForDonor(JSON.parse(localStorage.getItem("registeredUser")), navigate))
    } else {
      dispatch(setModalMessage('You need to upload your image of Identity Card/Passport!'))
      dispatch(showModal())
    }
  };

  React.useEffect(() => {
    if ( frontImage !== undefined ) {
      const reader = new FileReader();
      reader.onload = function () {
        var base64String = reader.result.replace("data:", "")
            .replace(/^.+,/, "");
        setFrontImgBase64(base64String)
      }
      reader.readAsDataURL(frontImage);
    }
    if (backImage !== undefined) {
      const reader = new FileReader();
      reader.onload = function () {
        var base64String = reader.result.replace("data:", "")
            .replace(/^.+,/, "");
        setBackImgBase64(base64String)
      }
      reader.readAsDataURL(backImage);
    }
  })
 
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
                        Description
                      </Form.Label>
                      <Form.Control {...register("description")} />
                      {errors.description && errors.description.type === "required" && (
                        <p className="mt-2 error">
                          <FaExclamationTriangle className="mx-2" />
                          Description is required
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
                        <UploadButton label='Upload front side' type={imageOnly} setValue={setFrontImage}/>
                        <UploadButton label='Upload back side' type={imageOnly} setValue={setBackImage}/>
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
      <Modal />
    </Container>
  );
};

export default AccountInfo;
