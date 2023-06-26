// Essentials
import React, { useState, useEffect } from 'react';
import { Button, Container, Col, Form, Row, Stack } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'

// Components
import ChipList from 'components/common/chip/ChipList';

// Form handling
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

// Assets imports
import { FaExclamationTriangle } from 'react-icons/fa';
import { MdAccessTime } from 'react-icons/md';

// Utils
import { convertToString } from 'utils/helpers/Time';
import { postDoneeRequest } from 'components/redux/reducer/RequestReducer';
import { handleMaxInput } from 'utils/helpers/String';

const RequestInfoCard = (
  {isActive, setActive, volunteerInfo}
) => {
  const userInfo = useSelector(state => state.authenticationReducer.user)
  const userToken = useSelector(state => state.authenticationReducer.token)
  const selectedAddress = useSelector(state => state.addressReducer.selectedAddress)
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Chip List
  const [activeStatusIdx, setActiveStatusIdx] = useState(0);
  const statusList = ['pickup', 'delivery'];
  const getStatusLabel = (status) => {
    switch (status) {
      case 'pickup':
        return 'Lấy tại chỗ';
      default:
        return 'Giao hàng';
    }
  };
  const styleList = ['success', 'success'];

  // Form handling
  const formSchema = Yup.object().shape({
    reason: Yup.string().required(''),
    currentAddress: Yup.object().required('')
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, setValue, formState } = useForm(formOptions);
  const { errors } = formState;
  
  const onSubmit = (data) => {
    dispatch(postDoneeRequest({
      reason: data.reason, 
      delivery_type: activeStatusIdx === 0 ? 'pickup' : 'delivery',
      address: data.currentAddress.address,
      lat: data.currentAddress.lat,
      long: data.currentAddress.long
    }, {userInfo, userToken}, navigate));
    setActive(false);
  };
  const [reason, setReason] = useState('');

  // useEffect
  useEffect(() => {
    if (activeStatusIdx === 0) {
      setValue('currentAddress', {})
    } else {
      setValue('currentAddress', selectedAddress)
    }
  }, [activeStatusIdx])

  return (
      <Container  >
        {
          isActive && 
            <Row>
              <Col>
                <div className='order-info-card'>
                  <h3 className='order-item-date'>
                    Tạo Yêu cầu nhận
                  </h3>
                  <header className='order-item-secondary mt-2'>
                    <MdAccessTime /> {convertToString(new Date(), 'LocaleDateString')}
                  </header>

                  <Stack className='mb-2 mt-3' direction='horizontal' gap={2}>
                    <h5 className='order-item-date'>
                      Hình thức nhận thực phẩm
                    </h5>
                    <ChipList
                      activeStatusIdx={activeStatusIdx}
                      setActiveStatusIdx={setActiveStatusIdx}
                      statusList={statusList}
                      getStatusLabel={getStatusLabel}
                      styleList={styleList}
                    />
                  </Stack>
                  <header className='order-item-secondary'>
                    <Stack direction='horizontal' gap={2}>
                      <div className='fw-bold'>{activeStatusIdx === 0 ? 'Địa chỉ lấy tại chỗ:' : 'Địa chỉ giao hàng:'}</div>
                      <div>{activeStatusIdx === 0 ? (volunteerInfo ? volunteerInfo.address : 'Không có') : selectedAddress.address}</div>
                    </Stack>
                  </header>
                  
                  <Form className='mt-4' onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className='mb-3'>
                      <Form.Label style={{ fontWeight: 'bold' }}>
                        Lí do đặt các Thực phẩm
                      </Form.Label>
                      <Form.Control
                        {...register('reason')}
                        value={reason}
                        onChange={(event) => handleMaxInput(event, 255, setReason)}
                        as='textarea'
                      />
                      <Form.Text>
                        Còn {255 - reason.length} ký tự
                      </Form.Text>
                      {errors.reason && errors.reason.type === 'required' && (
                        <p className="mt-2 error">
                          <FaExclamationTriangle className="mx-2" />
                          Bạn chưa điền lí do
                        </p>
                      )}
                    </Form.Group>

                    <Row className='mt-4'>
                      <Col className='d-flex justify-content-end'>
                        <Stack direction='horizontal' gap={2}>
                          <Button className='fogi' variant='primary' type='submit'>
                            Tạo Yêu cầu
                          </Button>
                          <Button variant='outline-secondary' onClick={() => setActive(false)}>
                            Quay về
                          </Button>
                        </Stack>
                      </Col>
                    </Row>
                  </Form>

                </div>
              </Col>
            </Row>
          }
      </Container>
  );
};

export default RequestInfoCard;
