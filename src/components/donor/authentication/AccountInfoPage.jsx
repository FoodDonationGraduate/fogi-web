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
import Modal from "components/layout/InfoModal.jsx";
import Tooltip from 'components/common/Tooltip';

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
        <Col md={8} lg={6} xl={4}>
          <Card className='shadow'>
            <Card.Body>
              <div className='mb-3 mt-md-4 mx-4'>
                <Stack className='mb-4' direction='horizontal' gap={4}>
                  <Logo usertype={0} />
                  <h2 className='fw-bold'>
                    Thông tin Tài khoản
                  </h2>
                </Stack>
                <div className='mb-3'>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <header className='form-header mb-3'>
                      Thông tin Cửa hàng
                    </header>
                    <Form.Group className='mb-3'>
                      <Form.Label className='text-center' style={{ fontWeight: 'bold' }}>
                        Tên Cửa hàng
                      </Form.Label>
                      <Form.Control {...register("brandname")} />
                      {errors.brandname && errors.brandname.type === "required" && (
                        <p className="mt-2 error">
                          <FaExclamationTriangle className="mx-2" />
                          Bạn chưa nhập tên cửa hàng
                        </p>
                      )}
                    </Form.Group>

                    <Form.Group className='mb-3'>
                      <Form.Label className='text-center' style={{ fontWeight: 'bold' }}>
                        Địa chỉ
                      </Form.Label>
                      <Form.Control
                        {...register("address")}
                      />
                      {errors.address && errors.address.type === "required" && (
                        <p className="mt-2 error">
                          <FaExclamationTriangle className="mx-2" />
                          Bạn chưa nhập địa chỉ
                        </p>
                      )}
                    </Form.Group>

                    <Form.Group className='mb-3'>
                      <Form.Label className='text-center' style={{ fontWeight: 'bold' }}>
                        Mô tả
                      </Form.Label>
                      <Form.Control as='textarea' {...register("description")} />
                      {errors.description && errors.description.type === "required" && (
                        <p className="mt-2 error">
                          <FaExclamationTriangle className="mx-2" />
                          Bạn chưa nhập mô tả
                        </p>
                      )}
                    </Form.Group>

                    <header className='form-header mb-3'>
                      Thông tin Người đại diện
                    </header>

                    <Form.Group className='mb-3'>
                      <Form.Label className='text-center' style={{ fontWeight: 'bold' }}>
                        Họ tên
                      </Form.Label>
                      <Form.Control
                        {...register("ownername")}
                      />
                      {errors.ownername && errors.ownername.type === "required" && (
                        <p className="mt-2 error">
                          <FaExclamationTriangle className="mx-2" />
                          Bạn chưa nhập họ tên
                        </p>
                      )}
                    </Form.Group>

                    <Form.Group className='mb-3'>
                      <Form.Label className='text-center' style={{ fontWeight: 'bold' }}>
                        Giấy tờ tùy thân{' '}
                        <Tooltip tip={'CMND/CCCD/Hộ chiếu'} />
                      </Form.Label>
                      <Stack direction='horizontal' gap={2}>
                        <UploadButton label='Tải lên mặt trước' type={imageOnly} setValue={setFrontImage}/>
                        <UploadButton label='Tải lên mặt trước' type={imageOnly} setValue={setBackImage}/>
                      </Stack>
                    </Form.Group>

                    <div className='d-grid'>
                      <Button className='fogi' variant='primary' type='submit'>
                        Tiếp tục
                      </Button>
                      <Button className='mt-2' variant='outline-secondary'>
                        Trở về
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
