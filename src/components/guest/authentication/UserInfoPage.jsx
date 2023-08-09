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
import { MdClose } from 'react-icons/md';

// Style imports
import 'assets/css/Authentication.css';
import 'assets/css/Fogi.css';

const UserInfo = () => {
  const registeredUser = useSelector(state => state.authenticationReducer.registeredUser)

  const formSchema = Yup.object().shape({
    background: Yup.string().required('')
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  const [submitted, setSubmitted] = React.useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const onSubmit = async (data) => {
    if (images.length !== 0) {
      await dispatch(signupUserInfo(data))
      await dispatch(signupUserInfo({background_images: base64Images}))
      console.log(JSON.parse(localStorage.getItem("registeredUser")))
      dispatch(signup(JSON.parse(localStorage.getItem("registeredUser")), navigate))
      setImages([]);
    } else {
      dispatch(setModalMessage('Bạn cần phải đính kèm hình ảnh chứng minh!'))
      dispatch(showModal())
    }
  };

  // Image handling
  const imageOnly = 'image/png, image/gif, image/jpeg';
  const [images, setImages] = React.useState([]);
  const [base64Images, setBase64Images] =  React.useState([]);
  const removeImageAtIdx = (idx) => {
    const newImages = new DataTransfer();
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      if (idx !== i) {
        newImages.items.add(image);
      }
    }
    setImages(newImages.files);
  };

  React.useEffect(() => {
    var newImages = [];
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const reader = new FileReader();
      reader.onload = function () {
        var base64String = reader.result.replace("data:", "")
            .replace(/^.+,/, "");
        newImages.push(base64String);
      }
      reader.readAsDataURL(image);
    }
    setBase64Images(newImages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);
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
                    Thông tin Người dùng
                  </h2>
                </Stack>
                <div className='mb-3'>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className='mb-3'>
                      <Form.Label className='text-center' style={{ fontWeight: 'bold' }}>
                        Hoàn cảnh
                      </Form.Label>
                      <Form.Control
                        type='text'
                        as='textarea'
                        defaultValue={registeredUser.name ? registeredUser.name : ''}
                        {...register("background")} />
                      {errors.name && errors.name.type === "required" && (
                        <p className="mt-2 error">
                          <FaExclamationTriangle className="mx-2" />
                          Bạn chưa nhập hoàn cảnh
                        </p>
                      )}
                    </Form.Group>

                    <Form.Group className='mb-3'>
                      <Form.Label style={{ fontWeight: 'bold' }}>
                        Hình ảnh chứng minh{' '}
                        <Tooltip tip={'Ít nhất 1 hình ảnh'} />
                      </Form.Label>
                      <UploadButton
                        label='Upload'
                        type={imageOnly}
                        setValue={setImages}
                        allowMultiple={true}
                      />
                      <div className='mt-2'>
                        {images && Array.from({ length: images.length }).map((_, idx) => (
                          <Stack className='upload-tag' direction='horizontal' key={idx}>
                            {idx}_{images[idx].name}
                            <MdClose
                              className='upload-tag-close'
                              onClick={() => {
                                removeImageAtIdx(idx);
                              }}
                            />
                          </Stack>
                        ))}
                      </div>
                      {submitted && images.length === 0 && (
                        <p className="mt-2 error">
                          <FaExclamationTriangle className="mx-2" />
                          Bạn chưa đăng hình ảnh chứng minh
                        </p>
                      )}
                    </Form.Group>

                    <div className='d-grid'>
                      <Button className='fogi' variant='primary' type='submit' onClick={() => { setSubmitted(true); }}>
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

export default UserInfo;
