// Essentials
import React from 'react';
import {
  Button, Form,  Modal
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Form handling
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

// Components
import Tooltip from 'components/common/Tooltip';
import { setModalMessage, setModalType, showModal } from 'components/redux/reducer/ModalReducer';
import { postDonorRequest } from 'components/redux/reducer/RequestReducer';

// Assets imports
import { FaExclamationTriangle } from 'react-icons/fa';

// Style imports
import 'assets/css/Authentication.css';

const CreateRequestModal = ({
  show,
  onClose
}) => {
  const userInfo = useSelector(state => state.authenticationReducer.user);
  const userToken = useSelector(state => state.authenticationReducer.token);
  const selectedAddress = useSelector(state => state.addressReducer.selectedAddress);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form handling
  const formSchema = Yup.object().shape({
    available_date: Yup.string().required(''),
    available_start: Yup.string().required(''),
    available_end: Yup.string().required('')
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const createRequest = (data) => {
    if (data.available_start < data.available_end) {
      dispatch(postDonorRequest({
          ...selectedAddress,
          available_date: data.available_date,
          available_start: data.available_start,
          available_end: data.available_end
        },
        {userInfo, userToken},
        navigate)
      );
      onClose();
    } else {
      dispatch(setModalMessage('Thời gian bắt đầu phải sớm hơn Thời gian kết thúc'));
      dispatch(setModalType('danger'));
      dispatch(showModal());
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={onClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tạo Yêu cầu cho</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(createRequest)}>
            <Form.Group className='mb-3'>
              <Form.Label style={{ fontWeight: 'bold'}}>
                Địa chỉ
              </Form.Label>
              <div>
                {selectedAddress.address}
              </div>
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label style={{ fontWeight: 'bold' }}>
                Ngày sẵn sàng giao thực phẩm
              </Form.Label>
              <Form.Control type='date' min={new Date().toISOString().slice(0,10)} {...register('available_date')} />
              {errors.available_date && errors.available_date.type === 'required' && (
                <p className="mt-2 error">
                  <FaExclamationTriangle className="mx-2" />
                  Bạn chưa điền ngày sẵn sàng
                </p>
              )}
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label style={{ fontWeight: 'bold'}}>
                Thời gian bắt đầu{' '}
                <Tooltip tip={'Thời gian Tình nguyện viên có thể bắt đầu nhận thực phẩm'} />
              </Form.Label>
              <Form.Control
                type='time'
                {...register('available_start')}
              />
              {errors.available_start && errors.available_start.type === 'required' && (
                <p className="mt-2 error">
                  <FaExclamationTriangle className="mx-2" />
                  Bạn chưa điền thời gian bắt đầu
                </p>
              )}
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label style={{ fontWeight: 'bold'}}>
                Thời gian kết thúc{' '}
                <Tooltip tip={'Thời gian Tình nguyên viên không thể nhận thực phẩm nữa'} />
              </Form.Label>
              <Form.Control
                type='time'
                {...register('available_end')}
              />
              {errors.available_end && errors.available_end.type === 'required' && (
                <p className="mt-2 error">
                  <FaExclamationTriangle className="mx-2" />
                  Bạn chưa điền thời gian kết thúc
                </p>
              )}
            </Form.Group>

            <div className='d-grid'>
              <Button
                className='fogi'
                variant='primary'
                type='submit'
              >
                Tạo Yêu cầu
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreateRequestModal;
