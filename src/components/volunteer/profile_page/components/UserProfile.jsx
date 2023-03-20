import * as React from 'react';
import { Card, Container, Button, Form, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";

// Form handling
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { FaExclamationTriangle } from "react-icons/fa";

import 'assets/css/user/profile_page/UserProfile.css'

import AvatarSection from './AvatarSection';
import { patchProfile } from 'components/redux/reducer/AuthenticationReducer.jsx'
import { setModalMessage, showModal, cancelQuestionModal } from 'components/redux/reducer/ModalReducer';

function UserProfile() {
    const [data, setData] = React.useState({})
    const userInfo = useSelector(state => state.authenticationReducer.user)
    const userToken = useSelector(state => state.authenticationReducer.token)
    const modalLogic = useSelector(state => state.modalReducer.logic)
    
    const formSchema = Yup.object().shape({
        name: Yup.string().required('Full name is required'),
        email: Yup.string().required('Email is required'),
        phone: Yup.string().required('Phone number is required'),
        address: Yup.string().required('Address is required'),
    });
    const formOptions = { resolver: yupResolver(formSchema) };
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmitProfile = (data) => {
        dispatch(setModalMessage("Do you want to save this change?"))
        dispatch(showModal())
        setData(data)
    }

    React.useEffect(() => {
        if (modalLogic) {
            dispatch(cancelQuestionModal())
            dispatch(patchProfile(data, {userInfo, userToken}, navigate))
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
                                        Personal Information
                                    </header>
                                    <Form.Group className='mb-3 d-flex'>
                                        <Form.Label column sm="3">
                                            Full name
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control
                                                type='text'
                                                placeholder='Nguyen Thi C'
                                                defaultValue={userInfo.name ? userInfo.name : ''}
                                                {...register("name")} />
                                            {errors.name && errors.name.type === "required" && (
                                                <p className="mt-2 error">
                                                <FaExclamationTriangle className="mx-2" />
                                                Full name is required
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
                                                placeholder="nguyenthic123@gmail.com"
                                                defaultValue={userInfo.email ? userInfo.email : ''}
                                                readOnly
                                                {...register("email")}
                                            />
                                            {errors.email && errors.email.type === "required" && (
                                                <p className="mt-2 error">
                                                <FaExclamationTriangle className="mx-2" />
                                                Email is required
                                                </p>
                                            )}
                                        </Col>
                                    </Form.Group>

                                    <Form.Group className='mb-3 d-flex'>
                                        <Form.Label column sm="3">
                                            Phone Number
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
                                                Phone number is required
                                                </p>
                                            )}
                                        </Col>
                                    </Form.Group>

                                    <Form.Group className='mb-3 d-flex'>
                                        <Form.Label column sm="3">
                                            Address
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control
                                                type='text'
                                                placeholder='200 NVC, Q5, TPHCM'
                                                defaultValue={userInfo.address ? userInfo.address : ''}
                                                {...register("address")}
                                            />
                                            {errors.address && errors.address.type === "required" && (
                                                <p className="mt-2 error">
                                                <FaExclamationTriangle className="mx-2" />
                                                Address is required
                                                </p>
                                            )}
                                        </Col>
                                    </Form.Group>

                                    <div className='submit-form-button d-flex justify-content-center'>
                                        <Button className='card-green-button mx-auto' type='submit'>
                                            Save changes
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