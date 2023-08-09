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
    request_name: Yup.string().required(''),
    available_start_date: Yup.string().required(''),
    available_start_time: Yup.string().required(''),
    available_end_date: Yup.string().required(''),
    available_end_time: Yup.string().required('')
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const createRequest = (data) =>  {
    console.log(data);
    if (data.available_start_date >= data.available_end_date) {
      dispatch(setModalMessage('Ngày bắt đầu phải sớm hơn ngày kết thúc'));
      dispatch(setModalType('danger'));
      dispatch(showModal());
    } else if (data.available_start_time >= data.available_end_time) {
      dispatch(setModalMessage('Thời gian bắt đầu phải sớm hơn thời gian kết thúc'));
      dispatch(setModalType('danger'));
      dispatch(showModal());
    } else {
      dispatch(postDonorRequest({
        ...selectedAddress,
        request_name: data.request_name,
        available_start_date: data.available_start_date,
        available_start_time: data.available_start_time + ':00',
        available_end_date: data.available_end_date,
        available_end_time: data.available_end_time + ':00'
      },
      {userInfo, userToken},
      navigate));
      onClose();
    }
  };

  React.useEffect(() => {
    reset({
      request_name: 'Yêu cầu nhận thực phẩm ngày ' + new Date().toLocaleDateString()
    })
  }, [show])

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
              <Form.Label style={{ fontWeight: 'bold' }}>
                Tên Yêu cầu
              </Form.Label>
              <Form.Control{...register('request_name')} />
              {errors.request_name && errors.request_name.type === 'required' && (
                <p className="mt-2 error">
                  <FaExclamationTriangle className="mx-2" />
                  Bạn chưa điền tên Yêu cầu
                </p>
              )}
            </Form.Group>

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
                Ngày bắt đầu giao thực phẩm
              </Form.Label>
              <Form.Control 
                type='date' 
                min={new Date().toISOString().slice(0,10)}
                {...register('available_start_date')} />
              {errors.available_start_date && errors.available_start_date.type === 'required' && (
                <p className="mt-2 error">
                  <FaExclamationTriangle className="mx-2" />
                  Bạn chưa điền ngày bắt đầu
                </p>
              )}
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label style={{ fontWeight: 'bold' }}>
                Ngày kết thúc giao thực phẩm
              </Form.Label>
              <Form.Control 
                type='date' 
                min={new Date((new Date()).setDate((new Date()).getDate() + 1)).toISOString().split('T')[0]}
                {...register('available_end_date')} />
              {errors.available_end_date && errors.available_end_date.type === 'required' && (
                <p className="mt-2 error">
                  <FaExclamationTriangle className="mx-2" />
                  Bạn chưa điền ngày kết thúc
                </p>
              )}
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label style={{ fontWeight: 'bold'}}>
                Thời gian bắt đầu mỗi ngày{' '}
                <Tooltip tip={'Thời gian Tình nguyện viên có thể bắt đầu nhận thực phẩm'} />
              </Form.Label>
              <Form.Control
                type='time'
                {...register('available_start_time')}
              />
              {errors.available_start_time && errors.available_start_time.type === 'required' && (
                <p className="mt-2 error">
                  <FaExclamationTriangle className="mx-2" />
                  Bạn chưa điền thời gian bắt đầu
                </p>
              )}
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label style={{ fontWeight: 'bold'}}>
                Thời gian kết thúc mỗi ngày{' '}
                <Tooltip tip={'Thời gian Tình nguyên viên không thể nhận thực phẩm nữa'} />
              </Form.Label>
              <Form.Control
                type='time'
                {...register('available_end_time')}
              />
              {errors.available_end_time && errors.available_end_time.type === 'required' && (
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
