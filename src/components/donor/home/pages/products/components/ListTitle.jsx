// Essentials
import React, { useState, useEffect } from 'react';
import { Button, Col, Form, Modal, Row, Stack } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

// Form handling
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

// Styling
import 'assets/css/Fogi.css';

// Assets
import { MdAddCircle, MdAssignment } from 'react-icons/md';
import { FaExclamationTriangle } from 'react-icons/fa';

// Utility
import { useResizer } from 'utils/helpers/Resizer';

// Components
import Tooltip from 'components/common/Tooltip';
import { setModalMessage, setModalType, showModal } from 'components/redux/reducer/ModalReducer';
import { postDonorRequest } from 'components/redux/reducer/RequestReducer';

const ListTitle = ({
  onShowAdd
}) => {
  const size = useResizer();
  const userInfo = useSelector(state => state.authenticationReducer.user);
  const userToken = useSelector(state => state.authenticationReducer.token);
  const selectedAddress = useSelector(state => state.addressReducer.selectedAddress);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Create Request Modal
  const [show, setShow] = useState(false);
  const onClose = () => setShow(false);
  const onShow = () => setShow(true);

  // Form handling
  const formSchema = Yup.object().shape({
    start_time: Yup.string().required(''),
    end_time: Yup.string().required('')
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const createRequest = (data) => {
    if (data.start_time < data.end_time) {
      dispatch(postDonorRequest({
          ...selectedAddress,
          available_start: data.start_time,
          available_end: data.end_time
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
              <Form.Label style={{ fontWeight: 'bold'}}>
                Thời gian bắt đầu{' '}
                <Tooltip tip={'Thời gian Tình nguyện viên có thể bắt đầu nhận thực phẩm'} />
              </Form.Label>
              <Form.Control
                type='time'
                {...register('start_time')}
              />
              {errors.start_time && errors.start_time.type === 'required' && (
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
                {...register('end_time')}
              />
              {errors.end_time && errors.end_time.type === 'required' && (
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

      <Row className='mb-4'>
        <Col className='ps-0'>
          <h2 className='fw-bold'>Túi quyên góp</h2>
        </Col>
        <Col className='pe-0 d-flex justify-content-end' xs={6}>
          <Stack direction='horizontal' gap={2}>
            <Button
              className='fogi' variant='primary'
              onClick={onShowAdd}
            >
              {size > 1 ? 
                <>Thêm Thực phẩm</> : 
                <MdAddCircle className='mb-1' />
              }
            </Button>
            <Button
              variant='outline-secondary'
              onClick={onShow}
            >
            {size > 1 ? 
              <>Tạo yêu cầu</> : 
              <MdAssignment className='mb-1' />
            }
            </Button>
          </Stack>
        </Col>
      </Row>
    
    </>
  );
};

export default ListTitle;
