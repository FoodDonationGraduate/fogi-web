// Essentials
import * as React from 'react';
import { Button, Card, Col, Container, Form, Row, Stack } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";

// Form handling
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

// Components
import Logo from 'components/common/Logo';
import InfoModal from 'components/layout/InfoModal'
import { signup, signupUserInfo } from 'components/redux/reducer/AuthenticationReducer';
import { setModalMessage, showModal } from 'components/redux/reducer/ModalReducer';
import Tooltip from 'components/common/Tooltip';
import UploadButton from 'components/common/UploadButton';

// Assets imports
import { FaExclamationTriangle } from "react-icons/fa";

// Style imports
import 'assets/css/Authentication.css';
import 'assets/css/Fogi.css';

const AccountInfo = () => {
  const registeredUser = useSelector(state => state.authenticationReducer.registeredUser)
  
  const imageOnly = 'image/png, image/gif, image/jpeg';
  const [frontImage, setFrontImage] = React.useState(undefined);
  const [backImage, setBackImage] = React.useState(undefined);
  const [id_front, setFrontImgBase64] = React.useState('');
  const [id_back, setBackImgBase64] = React.useState('');

  const formSchema = Yup.object().shape({
    name: Yup.string().required(''),
    dob: Yup.string().required(''),
    phone: Yup.string().required(''),
    address: Yup.string().required('')
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const onSubmit = async (data) => {
    if (id_front !== '' && id_back !== '') {
      await dispatch(signupUserInfo(data))
      await dispatch(signupUserInfo({id_front, id_back}))
      console.log(JSON.parse(localStorage.getItem("registeredUser")))
      dispatch(signup(JSON.parse(localStorage.getItem("registeredUser")), navigate))
    } else {
      dispatch(setModalMessage('Bạn cần phải đính kèm ảnh chụp thẻ căn cước công dân/ hộ chiếu!'))
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
                    <Form.Group className='mb-3'>
                      <Form.Label className='text-center' style={{ fontWeight: 'bold' }}>
                        Họ tên
                      </Form.Label>
                      <Form.Control
                        type='text'
                        defaultValue={registeredUser.name ? registeredUser.name : ''}
                        {...register("name")} />
                      {errors.name && errors.name.type === "required" && (
                        <p className="mt-2 error">
                          <FaExclamationTriangle className="mx-2" />
                          Bạn chưa nhập họ tên
                        </p>
                      )}
                    </Form.Group>

                    <Form.Group className='mb-3'>
                      <Form.Label className='text-center' style={{ fontWeight: 'bold' }}>
                        Ngày sinh
                      </Form.Label>
                      <Form.Control
                        type='date'
                        defaultValue={registeredUser.dob ? registeredUser.dob : ''}
                        placeholders='Select Date of Birth'
                        {...register("dob")}
                      />
                      {errors.dob && errors.dob.type === "required" && (
                        <p className="mt-2 error">
                          <FaExclamationTriangle className="mx-2" />
                          Bạn chưa nhập ngày sinh
                        </p>
                      )}
                    </Form.Group>

                    <Form.Group className='mb-3'>
                      <Form.Label className='text-center' style={{ fontWeight: 'bold' }}>
                        Số điện thoại
                      </Form.Label>
                      <Form.Control
                        type='number'
                        defaultValue={registeredUser.phone ? registeredUser.phone : ''}
                        {...register("phone")}
                      />
                      {errors.phone && errors.phone.type === "required" && (
                        <p className="mt-2 error">
                          <FaExclamationTriangle className="mx-2" />
                          Bạn chưa nhập số điện thoại
                        </p>
                      )}
                    </Form.Group>

                    <Form.Group className='mb-3'>
                      <Form.Label className='text-center' style={{ fontWeight: 'bold' }}>
                        Địa chỉ
                      </Form.Label>
                      <Form.Control
                        type='text'
                        defaultValue={registeredUser.phone ? registeredUser.phone : ''}
                        {...register("address")} />
                      {errors.address && errors.address.type === "required" && (
                        <p className="mt-2 error">
                          <FaExclamationTriangle className="mx-2" />
                          Bạn chưa nhập địa chỉ
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
                        Đăng ký
                      </Button>
                      <Button className='mt-2' variant='outline-secondary' onClick={() => navigate(-1)}>
                        Quay về
                      </Button>
                    </div>
                  </Form>
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

export default AccountInfo;
