// Essentials
import React, { useState } from 'react';
import { Container, Row, Stack, Button, Form } from 'react-bootstrap';

// Components
import TopSection from 'components/layout/TopSection';
import Footer from 'components/layout/Footer';
import OrderList from './components/OrderList';
import ChipList from 'components/common/chip/ChipList';
import InfoModal from 'components/layout/InfoModal';
import DropdownList from 'components/common/dropdown/DropdownList';

// Style
import 'assets/css/user/order/Order.css';

// Form handling
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import TopBar from 'components/layout/TopBar';

const OrderListPage = () => {
  // Request attributes
  const requestAttributes = JSON.parse(localStorage.getItem('requestAttributes'));
  
  // Chip List - Request type
  const typeList = ['delivery', 'pickup'];
  const getTypeLabel = (status) => {
    switch (status) {
      case 'delivery': return 'Nhận (giao hàng)';
      default: return 'Nhận (tại kho)';
    }
  };
  const typeStyleList = ['success', 'success', 'success'];
  const [activeFromIdx, setActiveFromIdx] = useState(requestAttributes ? typeList.indexOf(requestAttributes.delivery_type) : 0);

  // Chip List - Request status
  const statusList = [
    ['', 'pending', 'finding', 'receiving', 'shipping', 'success', 'canceled'],
    ['', 'pending', 'accepted', 'receiving', 'success', 'canceled'],
  ];
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
  const styleList = [
    ['neutral', 'neutral', 'info', 'warning', 'warning', 'success', 'danger'],
    ['neutral', 'neutral', 'info', 'warning', 'success', 'danger']
  ];
  const [activeStatusIdx, setActiveStatusIdx] = useState(requestAttributes ? statusList[typeList.indexOf(requestAttributes.delivery_type)].indexOf(requestAttributes.status) : 0);
  React.useEffect(() => {
    if (activeStatusIdx > statusList[activeFromIdx].length) { setActiveStatusIdx(0); }
  }, [activeFromIdx])
  
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
  const [queryData, setQueryData] = useState(requestAttributes ? requestAttributes.query : '');
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
      <div>
        <TopBar searchFlag={false}/>
      </div>
      <div className='bg'>
        <div className='mt-2'></div>
        <Container>
          <Row className='mb-4'>
            <Stack direction='horizontal' className='mb-2 d-flex' gap={3}>
              <h2 className='fw-bold me-auto'>Yêu cầu của bạn</h2>
              <Form className="search-form d-flex justify-content-right" onSubmit={handleSubmit(onSubmit)}>
                <Form.Control
                  type="search"
                  placeholder="Tìm kiếm"
                  className="search-box"
                  aria-label="Search"
                  defaultValue={queryData}
                  {...register("query")}
                />
                <Button className='px-4 search-btn' type='submit' variant='dark'>
                  <FontAwesomeIcon icon={faSearch} />
                </Button>
              </Form>
            </Stack>
            <ChipList
              activeStatusIdx={activeFromIdx}
              setActiveStatusIdx={setActiveFromIdx}
              statusList={typeList}
              getStatusLabel={getTypeLabel}
              styleList={typeStyleList}
              title={'Loại yêu cầu'}
              style={'mb-2'}
            />
            <ChipList
              activeStatusIdx={activeStatusIdx}
              setActiveStatusIdx={setActiveStatusIdx}
              statusList={statusList[activeFromIdx]}
              getStatusLabel={getStatusLabel}
              styleList={styleList[activeFromIdx]}
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
          <OrderList 
            currentDeliveryType={typeList[activeFromIdx]}
            currentStatus={statusList[activeFromIdx][activeStatusIdx]}
            currentFilter={filterList[activeFilterIdx]}
            queryData={queryData}
          />
        </Container>
      </div>
      <div>
        <Footer />
        <InfoModal />
      </div>
    </>
  );
};

export default OrderListPage;