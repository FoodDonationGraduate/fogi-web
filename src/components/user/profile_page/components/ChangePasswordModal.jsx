// Essentials
import * as React from 'react';
import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

// Form handling
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

// Assets imports
import { FaExclamationTriangle } from "react-icons/fa";

// Style imports
import 'assets/css/Authentication.css';

const ChangePasswordModal = ({
  show,
  onClose
}) => {

  const formSchema = Yup.object().shape({
    curPassword: Yup.string()
      .required('You must enter your current password'),
    newPassword: Yup.string()
      .required('Password is required')
      .min(6, "Password must contain at least 6 characters"),
    confirm: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("newPassword")], "Password does not match")
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  
  // New password matches with the current one
  const [isSame, setIsSame] = useState(false);

  const onSubmit = (data) => {
    setIsSame(data.curPassword === data.newPassword);
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
            <Form.Control type="password" {...register("curPassword")} />
            {errors.curPassword && errors.curPassword.type === "required" && (
              <p className="mt-2 error">
                <FaExclamationTriangle className="mx-2" />
                Current password is required
              </p>
            )}
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label className='text-center' style={{ fontWeight: 'bold' }}>
              New Password
            </Form.Label>
            <Form.Control type="password" {...register("newPassword")} />
            {errors.newPassword && errors.newPassword.type === "required" && (
              <p className="mt-2 error">
                <FaExclamationTriangle className="mx-2" />
                New password is required
              </p>
            )}
            {errors.newPassword && errors.newPassword.type === "min" && (
              <p className="mt-2 error">
                <FaExclamationTriangle className="mx-2" />
                Password must contain at least 6 characters
              </p>
            )}
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label className='text-center' style={{ fontWeight: 'bold' }}>
              Confirm Password
            </Form.Label>
            <Form.Control type="password" {...register("confirm")} />
          {errors.confirm && errors.confirm.type === "required" && (
            <p className="mt-2 error">
              <FaExclamationTriangle className="mx-2" />
              You must re-enter your new password here
            </p>
          )}
          {errors.confirm && errors.confirm.type === "oneOf" && (
            <p className="mt-2 error">
              <FaExclamationTriangle className="mx-2" />
              Password does not match
            </p>
          )}
          </Form.Group>
          {isSame && 
            <div className='text-center mb-3'>
              <a className='fw-bold text-danger text-decoration-none'>
                Current and New password must not match
              </a>
            </div> 
          }

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
