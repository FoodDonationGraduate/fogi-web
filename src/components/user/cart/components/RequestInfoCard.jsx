// Essentials
import React, { useState } from 'react';
import { Button, Container, Col, Form, Row, Stack } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'

// Components
import ChipList from 'components/common/chip/ChipList';
import VolunteerInfo from 'components/common/request/VolunteerInfo';

// Form handling
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

// Assets imports
import { FaExclamationTriangle } from 'react-icons/fa';
import { MdOutlineLocationOn, MdAccessTime } from 'react-icons/md';

// Utils
import { convertToString } from 'utils/helpers/Time';
import { postDoneeRequest } from 'components/redux/reducer/RequestReducer';

const RequestInfoCard = (
  {isActive, setActive}
) => {
  const userInfo = useSelector(state => state.authenticationReducer.user)
  const userToken = useSelector(state => state.authenticationReducer.token)
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form handling
  const formSchema = Yup.object().shape({
    reason: Yup.string().required('')
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  
  const onSubmit = (data) => {
    dispatch(postDoneeRequest({reason: data.reason}, {userInfo, userToken}, navigate))
    setActive(false)
  };

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
                      <div className='fw-bold'>Địa chỉ lấy tại chỗ: </div>
                      <div>227 Nguyễn Văn Cừ, P. 4, Q. 5, TP. Hồ Chí Minh</div>
                    </Stack>
                  </header>
                  
                  <Form className='mt-4' onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className='mb-3'>
                      <Form.Label style={{ fontWeight: 'bold' }}>
                        Lí do đặt các Món ăn
                      </Form.Label>
                      <Form.Control as='textarea' {...register('reason')} />
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

                  <VolunteerInfo volunteerInfo={undefined} />

                </div>
              </Col>
            </Row>
          }
      </Container>
  );
};

export default RequestInfoCard;
