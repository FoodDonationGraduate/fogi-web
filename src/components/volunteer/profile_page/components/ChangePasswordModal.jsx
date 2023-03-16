// Essentials
import * as React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";

// Form handling
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

// Assets imports
import { FaExclamationTriangle } from "react-icons/fa";

// Style imports
import 'assets/css/Authentication.css';
import { changePassword } from 'components/redux/reducer/AuthenticationReducer';

const ChangePasswordModal = ({
  show,
  onClose
}) => {
  const userInfo = useSelector(state => state.authenticationReducer.user)
  const userToken = useSelector(state => state.authenticationReducer.token)

  const formSchema = Yup.object().shape({
    password: Yup.string()
      .required('You must enter your current password')
      .min(8, "Password must contain at least 8 characters")
      .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,32}$/, "Password must contain at least 1 letter, 1 number and 1 special character"),
    new_password: Yup.string()
      .required('Password is required')
      .min(8, "Password must contain at least 8 characters")
      .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,32}$/, "Password must contain at least 1 letter, 1 number and 1 special character")
      .notOneOf([Yup.ref("password")], "Old password and new password must not be the same"),
    confirm_password: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("new_password")], "Password does not match")
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    dispatch(changePassword(data, {userInfo, userToken}, navigate))
  };
  return (
    <>
      <Modal
        show={show}
        onHide={onClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className='mb-3'>
            <Form.Label className='text-center' style={{ fontWeight: 'bold' }}>
              Current Password
            </Form.Label>
            <Form.Control type="password" {...register("password")} />
            {errors.password && errors.password.type === "required" && (
              <p className="mt-2 error">
                <FaExclamationTriangle className="mx-2" />
                Current password is required
              </p>
            )}
            {errors.password && errors.password.type === "min" && (
              <p className="mt-2 error">
                <FaExclamationTriangle className="mx-2" />
                Password must contain at least 8 characters
              </p>
            )}
            {errors.password && errors.password.type === "matches" && (
              <p className="mt-2 error">
                <FaExclamationTriangle className="mx-2" />
                Password must contain at least 1 letter, 1 number and 1 special character
              </p>
            )}
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label className='text-center' style={{ fontWeight: 'bold' }}>
              New Password
            </Form.Label>
            <Form.Control type="password" {...register("new_password")} />
            {errors.new_password && errors.new_password.type === "required" && (
              <p className="mt-2 error">
                <FaExclamationTriangle className="mx-2" />
                New password is required
              </p>
            )}
            {errors.new_password && errors.new_password.type === "min" && (
              <p className="mt-2 error">
                <FaExclamationTriangle className="mx-2" />
                Password must contain at least 8 characters
              </p>
            )}
            {errors.new_password && errors.new_password.type === "matches" && (
              <p className="mt-2 error">
                <FaExclamationTriangle className="mx-2" />
                Password must contain at least 1 letter, 1 number and 1 special character
              </p>
            )}
            {errors.new_password && errors.new_password.type === "notOneOf" && (
              <p className="mt-2 error">
                <FaExclamationTriangle className="mx-2" />
                Old password and new password must not be the same
              </p>
            )}
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label className='text-center' style={{ fontWeight: 'bold' }}>
              Confirm Password
            </Form.Label>
            <Form.Control type="password" {...register("confirm_password")} />
          {errors.confirm_password && errors.confirm_password.type === "required" && (
            <p className="mt-2 error">
              <FaExclamationTriangle className="mx-2" />
              You must re-enter your new password here
            </p>
          )}
          {errors.confirm_password && errors.confirm_password.type === "oneOf" && (
            <p className="mt-2 error">
              <FaExclamationTriangle className="mx-2" />
              Password does not match
            </p>
          )}
          </Form.Group>

          <div className='d-grid'>
            <Button className='fogi' variant='primary' type='submit'>
              Change password
            </Button>
          </div>
        </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ChangePasswordModal;
