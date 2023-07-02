import * as React from 'react';
import { Card, Container, Col, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";

// Form handling
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { FaExclamationTriangle } from "react-icons/fa";

import 'assets/css/user/profile_page/UserProfile.css'

import { patchProfile } from 'components/redux/reducer/AuthenticationReducer.jsx'
import { cancelQuestionModal, setModalQuestion, showQuestionModal } from 'components/redux/reducer/ModalReducer';
import AvatarSection from 'components/common/profile_page/AvatarSection';

function UserProfile() {
    const [data, setData] = React.useState({})
    const userInfo = useSelector(state => state.authenticationReducer.user)
    const userToken = useSelector(state => state.authenticationReducer.token)
    const modalLogic = useSelector(state => state.modalReducer.logic)

    const formSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().required('Email is required'),
        phone: Yup.string().required('Phone number is required'),
        dob: Yup.string().required('Date of birth is required')
    });
    const formOptions = { resolver: yupResolver(formSchema) };
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        dispatch(setModalQuestion("Bạn có muốn lưu thay đổi?"))
        dispatch(showQuestionModal())
        setData(data)
    }

    React.useEffect(() => {
        if (modalLogic) {
            dispatch(cancelQuestionModal())
            dispatch(patchProfile(data, {userInfo, userToken},navigate))
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
                                <Form className='d-block' onSubmit={handleSubmit(onSubmit)}>
                                    <header className='form-header mb-3'>
                                        Thông tin cá nhân
                                    </header>
                                    <Form.Group className='mb-3 d-flex'>
                                        <Form.Label column xs="3">
                                            Họ tên
                                        </Form.Label>
                                        <Col xs={9}>
                                            <Form.Control
                                                type='text'
                                                placeholder=''
                                                defaultValue={userInfo.name ? userInfo.name : ''}
                                                {...register("name")} />
                                            {errors.name && errors.name.type === "required" && (
                                                <p className="mt-2 error">
                                                <FaExclamationTriangle className="mx-2" />
                                                    Bạn chưa điền Họ tên
                                                </p>
                                            )}
                                        </Col>
                                    </Form.Group>

                                    <Form.Group className='mb-3 d-flex'>
                                        <Form.Label column xs="3">
                                            Email
                                        </Form.Label>
                                        <Col xs={9}>
                                            <Form.Control
                                                type='text'
                                                placeholder=''
                                                defaultValue={userInfo.email ? userInfo.email : ''}
                                                readOnly
                                                {...register("email")} />
                                            {errors.email && errors.email.type === "required" && (
                                                <p className="mt-2 error">
                                                <FaExclamationTriangle className="mx-2" />
                                                    Bạn chưa điền Email
                                                </p>
                                            )}
                                        </Col>
                                    </Form.Group>


                                    <Form.Group className='mb-3 d-flex'>
                                        <Form.Label column xs="3">
                                            Số điện thoại
                                        </Form.Label>
                                        <Col xs={9}>
                                            <Form.Control
                                                type='text'
                                                placeholder=''
                                                defaultValue={userInfo.phone ? userInfo.phone : ''}
                                                {...register("phone")} />
                                            {errors.phone && errors.phone.type === "required" && (
                                                <p className="mt-2 error">
                                                <FaExclamationTriangle className="mx-2" />
                                                    Bạn chưa điền số điện thoại
                                                </p>
                                            )}
                                        </Col>
                                    </Form.Group>

                                    <Form.Group className='mb-3 d-flex'>
                                        <Form.Label column xs="3">
                                            Ngày sinh
                                        </Form.Label>
                                        <Col xs={9}>
                                            <Form.Control
                                                type='date'
                                                placeholder='01-01-2001'
                                                defaultValue={userInfo.dob ? userInfo.dob : ''}
                                                {...register("dob")} />
                                            {errors.dob && errors.dob.type === "required" && (
                                                <p className="mt-2 error">
                                                <FaExclamationTriangle className="mx-2" />
                                                    Bạn chưa điền ngày sinh
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