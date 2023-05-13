// Essentials
import * as React from 'react';
import { Card, Container, Button, Form, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";

// Form handling
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { FaExclamationTriangle } from "react-icons/fa";

// Styling
import 'assets/css/user/profile_page/UserProfile.css'

// Components
import AvatarSection from './AvatarSection';
import UploadButton from 'components/common/UploadButton';
import { patchProfile } from 'components/redux/reducer/AuthenticationReducer.jsx'
import { cancelQuestionModal, setModalQuestion, showQuestionModal } from 'components/redux/reducer/ModalReducer';
import Tooltip from 'components/common/Tooltip';

function UserProfile() {
    const [data, setData] = React.useState({})
    const userInfo = useSelector(state => state.authenticationReducer.user)
    const userToken = useSelector(state => state.authenticationReducer.token)
    const modalLogic = useSelector(state => state.modalReducer.logic)

    const imageOnly = 'image/png, image/gif, image/jpeg';
    const [image, setImage] = React.useState(undefined);
    const [storefront, setImgBase64] = React.useState('');
    
    const formSchema = Yup.object().shape({
        owner_name: Yup.string().required('Ownner name is required'),
        email: Yup.string().required('Email is required'),
        phone: Yup.string().required('Phone number is required'),
        name: Yup.string().required('Brand name is required'),
        address: Yup.string().required('Address is required'),
        description: Yup.string().required('Address is required')
    });
    const formOptions = { resolver: yupResolver(formSchema) };
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmitProfile = (data) => {
        dispatch(setModalQuestion("Do you want to save this change?"))
        dispatch(showQuestionModal())
        setData(data)
    }

    React.useEffect(() => {
        if (modalLogic) {
            dispatch(cancelQuestionModal())
            data.storefront = storefront ? storefront : ''
            dispatch(patchProfile(data, {userInfo, userToken},navigate))
        }
        if ( image !== undefined ) {
            const reader = new FileReader();
            reader.onload = function () {
              var base64String = reader.result.replace("data:", "")
                  .replace(/^.+,/, "");
                  setImgBase64(base64String)
            }
            reader.readAsDataURL(image);
          }
    })
    
    return (
        <div className='user-profile-body'>
            <Container className='user-profile d-block'>
                <div className='user-profile-body'>
                    <Card className='p-4'>
                        <Card.Body className='d-block justify-content-left p-0' >
                            <AvatarSection/>
                            <div className='user-profile-info mt-4'>
                                <Form className='d-block' onSubmit={handleSubmit(onSubmitProfile)}>

                                    <header className='form-header mb-3'>
                                        Thông tin chung
                                    </header>

                                    <Form.Group className='mb-3 d-flex'>
                                        <Form.Label column sm="3">
                                            Tên cửa hàng
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control
                                                type='text'
                                                placeholder=''
                                                defaultValue={userInfo.name ? userInfo.name : ''}
                                                {...register("name")}
                                            />
                                            {errors.name && errors.name.type === "required" && (
                                                <p className="mt-2 error">
                                                <FaExclamationTriangle className="mx-2" />
                                                    Bạn chưa nhập tên cửa hàng
                                                </p>
                                            )}
                                        </Col>
                                    </Form.Group>

                                    <Form.Group className='mb-3 d-flex'>
                                        <Form.Label column sm="3">
                                            Địa chỉ
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control
                                                type='text'
                                                placeholder=''
                                                defaultValue={userInfo.address ? userInfo.address : ''}
                                                {...register("address")}
                                            />
                                            {errors.address && errors.address.type === "required" && (
                                                <p className="mt-2 error">
                                                <FaExclamationTriangle className="mx-2" />
                                                    Bạn chưa nhập địa chỉ
                                                </p>
                                            )}
                                        </Col>
                                    </Form.Group>
                                    
                                    <Form.Group className='mb-3 d-flex'>
                                        <Form.Label column sm="3">
                                            Mô tả
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control
                                                type='text'
                                                placeholder=''
                                                defaultValue={userInfo.description ? userInfo.description : ''}
                                                as='textarea'
                                                {...register("description")}
                                            />
                                            {errors.description && errors.description.type === "required" && (
                                                <p className="mt-2 error">
                                                <FaExclamationTriangle className="mx-2" />
                                                    Bạn chưa nhập mô tả
                                                </p>
                                            )}
                                        </Col>
                                    </Form.Group>
                                    <Form.Group className='mb-4 d-flex'>
                                        <Form.Label column sm="3">
                                            Hình mặt tiền{' '}
                                            <Tooltip tip={'Phải bao gồm biển hiệu, địa chỉ và nội thất'} />
                                        </Form.Label>
                                        <Col sm={9}>
                                            <UploadButton label='Upload' type={imageOnly} setValue={setImage}/>
                                        </Col>
                                    </Form.Group>



                                    <header className='form-header mb-3'>
                                        Thông tin người đại diện
                                    </header>
                                    <Form.Group className='mb-3 d-flex'>
                                        <Form.Label column sm="3">
                                            Họ tên
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control
                                                type='text'
                                                placeholder='Nguyen Thi C'
                                                defaultValue={userInfo.owner_name ? userInfo.owner_name : ''}
                                                {...register("owner_name")} />
                                            {errors.owner_name && errors.owner_name.type === "required" && (
                                                <p className="mt-2 error">
                                                <FaExclamationTriangle className="mx-2" />
                                                    Bạn chưa điền họ tên
                                                </p>
                                            )}
                                        </Col>
                                    </Form.Group>

                                    <Form.Group className='mb-3 d-flex'>
                                        <Form.Label column sm="3">
                                            Email
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control
                                                type="email"
                                                placeholder=''
                                                defaultValue={userInfo.email ? userInfo.email : ''}
                                                readOnly
                                                {...register("email")}
                                            />
                                            {errors.email && errors.email.type === "required" && (
                                                <p className="mt-2 error">
                                                <FaExclamationTriangle className="mx-2" />
                                                    Bạn chưa điền email
                                                </p>
                                            )}
                                        </Col>
                                    </Form.Group>

                                    <Form.Group className='mb-3 d-flex'>
                                        <Form.Label column sm="3">
                                            Số điện thoại
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control
                                                type='number'
                                                placeholder='0920101010'
                                                defaultValue={userInfo.phone ? userInfo.phone : ''}
                                                {...register("phone")}
                                            />
                                            {errors.phone && errors.phone.type === "required" && (
                                                <p className="mt-2 error">
                                                <FaExclamationTriangle className="mx-2" />
                                                    Bạn chưa điền số điện thoại
                                                </p>
                                            )}
                                        </Col>
                                    </Form.Group>

                                    <div className='submit-form-button d-flex'>
                                        <Button className='fogi' variant='primary' type='submit'>
                                            Lưu thay đổi
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </div>
    );
}

export default UserProfile;