// Essentials
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Form, Button, Container, Row, Stack } from 'react-bootstrap';
import { MdOutlineSouth, MdOutlineNorth } from 'react-icons/md';

// Components
import ChipList from 'components/common/chip/ChipList';
import DropdownList from 'components/common/dropdown/DropdownList';
import RequestList from './components/RequestList';

// Form handling
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const RequestListPage = () => {
  // Request attributes
  const requestAttributes = JSON.parse(localStorage.getItem('requestAttributes'));
  const userInfo = useSelector(state => state.authenticationReducer.user);

  // Chip List - Request type
  const typeList = ['donor', 'donee-delivery', 'donee-pickup'];
  const getTypeLabel = (status) => {
    switch (status) {
      case 'donee-delivery': return 'Nhận (giao hàng)';
      case 'donee-pickup': return 'Nhận (tại kho)';
      default: return 'Cho';
    }
  };
  const typeStyleList = ['success', 'success', 'success'];
  const [activeFromIdx, setActiveFromIdx] = useState(requestAttributes ? typeList.indexOf(requestAttributes.from) : 0);

  // Chip List - Request status
  const statusList = [
    ['', 'pending', 'finding', 'receiving', 'shipping', 'success', 'canceled'],
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
    ['neutral', 'neutral', 'info', 'warning', 'warning', 'success', 'danger'],
    ['neutral', 'neutral', 'info', 'warning', 'success', 'danger']
  ];
  const [activeStatusIdx, setActiveStatusIdx] = useState(requestAttributes ? statusList[typeList.indexOf(requestAttributes.from)].indexOf(requestAttributes.status) : 0);
  useEffect(() => {
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

  // Reqest filter sort
  const [sortBy, setSortBy] = useState(requestAttributes ? requestAttributes.sort_by : 'desc');

  // Handle search request
  const [queryData, setQueryData] = useState(requestAttributes ? requestAttributes.query : '');
  const formSchema = Yup.object().shape({
    query: Yup.string().required('')
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, watch, handleSubmit } = useForm(formOptions);
  const onSubmit = (data) => {
    setQueryData(data.query);
  }
  useEffect(() => {
    let data = watch('query');
    if (data === '') {
      setQueryData(data);
    }
  }, [watch('query')]);
  
  return (
    <>
      <Container>
        <Row className='mb-4'>
          {/* --- Top Section --- */}
          <Stack direction='horizontal' className='mb-2 d-flex' gap={3}>
            <h2 className='fw-bold me-auto'>Quản lý Yêu cầu</h2>
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
          {userInfo.user_type === 'director' && 
            <>
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
            </>
          }
          <DropdownList
            activeStatusIdx={activeFilterIdx}
            setActiveStatusIdx={setActiveFilterIdx}
            statusList={filterList}
            getStatusLabel={getFilterLabel}
            styleList={filterStyleList}
            title={'Sắp xếp'}
          />
        </Row>

        {/* --- Request List --- */}
        <div>
          <RequestList
            currentFrom={typeList[activeFromIdx]}
            currentStatus={statusList[activeFromIdx][activeStatusIdx]}
            currentFilter={filterList[activeFilterIdx]}
            currentSortBy={sortBy}
            queryData={queryData}
          />
        </div>

      </Container>
    </>
  )
};

export default RequestListPage;
