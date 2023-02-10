import * as React from 'react';
import {Card, Container, Button, Form} from 'react-bootstrap';
import 'assets/css/user/profile_page/UserProfile.css'
import UserAvatar from 'assets/images/UserAvatar.png'

// Form handling
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { FaExclamationTriangle } from "react-icons/fa";

function UserProfile() {
    const [avatar, setAvatar] = React.useState(UserAvatar);
    const formSchema = Yup.object().shape({
        fullname: Yup.string().required('Name is required'),
        email: Yup.string().required('Email is required'),
        phonenumber: Yup.string().required('Phone number is required'),
        dob: Yup.string().required('Date of birth is required'),
        sex: Yup.string().required('Sex is required'),
        address: Yup.string().required('Address is required')
    });
    const formOptions = { resolver: yupResolver(formSchema) };
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    const onSubmit = () => {
        console.log('login');
    };
    return (
        <div className='user-profile-body'>
            <Container className='user-profile d-block'>
                <div className='user-profile-body'>
                    <Card className='p-2'>
                        <Card.Body className='d-block justify-content-left p-0' >
                            <div className='user-profile-picture d-flex justify-content-left align-items-center'>
                                <img className='user-avatar' src={avatar}></img>
                                <Button className='card-buton card-grey-button change-avatar-button'>Change Profile Picture</Button>
                            </div>
                            <div className='user-profile-info mt-4'>
                                <Form className='d-block' onSubmit={handleSubmit(onSubmit)}>
                                    <Form.Group className='mb-3'>
                                        <Form.Control 
                                            placeholder='Nguyen Thi C'
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
                                            placeholders='01-01-2001'
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
                                        <Form.Control
                                            type='text'
                                            placeholder='Female'
                                            {...register("sex")}
                                        />
                                        {errors.sex && errors.sex.type === "required" && (
                                            <p className="mt-2 error">
                                                <FaExclamationTriangle className="mx-2" />
                                                Sex is required
                                            </p>
                                        )}
                                    </Form.Group>

                                    <Form.Group className='mb-4'>
                                        <Form.Control 
                                            type='text'
                                            placeholder='227 Nguyen Van Cu'
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