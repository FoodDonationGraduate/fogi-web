import * as React from 'react';
import {Card, Container, Button, Form} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";

// Form handling
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { FaExclamationTriangle } from "react-icons/fa";

import 'assets/css/user/profile_page/UserProfile.css'

import { updateProfile } from 'components/redux/reducer/AuthenticationReducer.jsx'
import { cancelQuestionModal, setModalQuestion, showQuestionModal } from 'components/redux/reducer/ModalReducer';
import AvatarSection from './AvatarSection';

function UserProfile() {
    const [data, setData] = React.useState({})
    const userInfo = useSelector(state => state.authenticationReducer.user)
    const userToken = useSelector(state => state.authenticationReducer.token)
    const modalLogic = useSelector(state => state.modalReducer.logic)

    const formSchema = Yup.object().shape({
        fullname: Yup.string().required('Name is required'),
        email: Yup.string().required('Email is required'),
        phonenumber: Yup.string().required('Phone number is required'),
        dob: Yup.string().required('Date of birth is required'),
        address: Yup.string().required('Address is required')
    });
    const formOptions = { resolver: yupResolver(formSchema) };
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        dispatch(setModalQuestion("Do you want to save this change?"))
        dispatch(showQuestionModal())
        setData(data)
    }

    React.useEffect(() => {
        if (modalLogic) {
            dispatch(cancelQuestionModal())
            dispatch(updateProfile(data, {userInfo, userToken},navigate))
        }
    })
    
    return (
        <div className='user-profile-body'>
            <Container className='user-profile d-block'>
                <div className='user-profile-body'>
                    <Card className='p-2'>
                        <Card.Body className='d-block justify-content-left p-0' >
                            <AvatarSection/>
                            <div className='user-profile-info mt-4'>
                                <Form className='d-block' onSubmit={handleSubmit(onSubmit)}>
                                    <Form.Group className='mb-3'>
                                        <Form.Control 
                                            type='text'
                                            placeholder='Nguyen Thi C'
                                            defaultValue={userInfo.name ? userInfo.name : ''}
                                            {...register("fullname")} />
                                        {errors.fullname && errors.fullname.type === "required" && (
                                            <p className="mt-2 error">
                                            <FaExclamationTriangle className="mx-2" />
                                            Full name is required
                                            </p>
                                        )}
                                    </Form.Group>

                                    <Form.Group className='mb-3'>
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
                                    </Form.Group>


                                    <Form.Group className='mb-3'>
                                        <Form.Control
                                            type='number'
                                            placeholder='0920101010'
                                            defaultValue={userInfo.phone ? userInfo.phone : ''}
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
                                        <Form.Control
                                            type='date'
                                            placeholders='31-12-2001'
                                            defaultValue={userInfo.dob ? userInfo.dob : ''}
                                            {...register("dob")}
                                        />
                                        {errors.dob && errors.dob.type === "required" && (
                                            <p className="mt-2 error">
                                                <FaExclamationTriangle className="mx-2" />
                                                Date of Birth is required
                                            </p>
                                        )}
                                    </Form.Group>

                                    <Form.Group className='mb-4'>
                                        <Form.Control 
                                            type='text'
                                            placeholder='227 Nguyen Van Cu'
                                            defaultValue={userInfo.address ? userInfo.address : ''}
                                            {...register("address")} 
                                        />
                                        {errors.address && errors.address.type === "required" && (
                                            <p className="mt-2 error">
                                            <FaExclamationTriangle className="mx-2" />
                                            Address is required
                                            </p>
                                        )}
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