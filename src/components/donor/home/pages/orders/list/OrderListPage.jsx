// Essentials
import React, { useState } from 'react';
import { Form, Button, Container, Row, Stack } from 'react-bootstrap';

// Components
import ChipList from 'components/common/chip/ChipList';
import DropdownList from 'components/common/dropdown/DropdownList';
import OrderList from './components/OrderList';

// Form handling
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
const OrderListPage = () => {
  // Request attributes
  const requestAttributes = JSON.parse(localStorage.getItem('requestAttributes'));
  
  // Chip List
  const statusList = ['', 'pending', 'finding', 'receiving', 'shipping', 'success', 'canceled'];
  const [activeStatusIdx, setActiveStatusIdx] = useState(requestAttributes ? statusList.indexOf(requestAttributes.status) : 0);
  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending':
        return 'Chờ duyệt';
      case 'accepted':
        return 'Chấp nhận';
      case 'finding':
        return 'Đang tìm';
      case 'receiving':
        return 'Đang nhận';
      case 'shipping':
        return 'Đang giao';
      case 'canceled':
        return 'Đã hủy';
      case 'success':
        return 'Thành công';
      default:
        return 'Tất cả';
    }
  };
  const styleList = ['neutral', 'neutral', 'info', 'warning', 'warning', 'success', 'danger'];

  // Chip List - Request filter
  const filterList = ['last_updated_state_time', 'created_time'];
  const getFilterLabel = (status) => {
    switch (status) {
      case 'last_updated_state_time':
        return 'Thời gian cập nhật';
      case 'created_time':
        return 'Thời gian khởi tạo';
    }
  };
  const filterStyleList = ['success', 'success'];
  const [activeFilterIdx, setActiveFilterIdx] = useState(requestAttributes ? filterList.indexOf(requestAttributes.filter) : 0);

  // Handle search request
  const [queryData, setQueryData] = useState('')
  const formSchema = Yup.object().shape({
    query: Yup.string().required('')
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, watch, handleSubmit } = useForm(formOptions);
  const onSubmit = (data) => {
    setQueryData(data.query)
  }
  React.useEffect(() => {
    let data = watch('query');
    if (data === '') {
      setQueryData(data)
    }
  }, [watch('query')])
  return (
    <>
        <Container>
          <Row className='mb-4'>
            <Stack direction='horizontal' className='mb-2 d-flex' gap={3}>
              <h2 className='fw-bold me-auto'>Danh sách Yêu cầu</h2>
              <Form className="search-form d-flex justify-content-right" onSubmit={handleSubmit(onSubmit)}>
                <Form.Control
                  type="search"
                  placeholder="Tìm kiếm"
                  className="search-box"
                  aria-label="Search"
                  {...register("query")}
                />
                <Button className='px-4 search-btn' type='submit' variant='dark'>
                  <FontAwesomeIcon icon={faSearch} />
                </Button>
              </Form>
            </Stack>
            <ChipList
              activeStatusIdx={activeStatusIdx}
              setActiveStatusIdx={setActiveStatusIdx}
              statusList={statusList}
              getStatusLabel={getStatusLabel}
              styleList={styleList}
              title={'Trạng thái'}
              style={'mb-2'}
            />
            <DropdownList
              activeStatusIdx={activeFilterIdx}
              setActiveStatusIdx={setActiveFilterIdx}
              statusList={filterList}
              getStatusLabel={getFilterLabel}
              styleList={filterStyleList}
              title={'Sắp xếp'}
            />
          </Row>
          
          <div className='pb-4'>
            <OrderList 
              currentStatus={statusList[activeStatusIdx]}
              currentFilter={filterList[activeFilterIdx]} 
              queryData={queryData}
            />
          </div>
        </Container>
        
    </>
  );
};

export default OrderListPage;
