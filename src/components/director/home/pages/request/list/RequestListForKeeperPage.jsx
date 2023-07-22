// Essentials
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Form, Button, Container, Row, Stack } from 'react-bootstrap';
import { MdOutlineSouth, MdOutlineNorth } from 'react-icons/md';

// Components
import ChipList from 'components/common/chip/ChipList';
import DropdownList from 'components/common/dropdown/DropdownList';
import RequestListForKeeper from './components/RequestListForKeeper';

// Form handling
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const RequestListForKeeperPage = () => {
  // Request attributes
  const requestAttributes = JSON.parse(localStorage.getItem('requestAttributes'));
  const userInfo = useSelector(state => state.authenticationReducer.user);

  // Chip List - Request status
  const statusList = [
    '', 'shipping', 'success', 'canceled'
  ];
  const getStatusLabel = (status) => {
    switch (status) {
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
    'success', 'warning', 'success', 'danger'
  ];
  const [activeStatusIdx, setActiveStatusIdx] = useState((requestAttributes && requestAttributes.status) ? statusList.indexOf(requestAttributes.status) : 0);
  
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
  const [activeFilterIdx, setActiveFilterIdx] = useState((requestAttributes && requestAttributes.filter) ? filterList.indexOf(requestAttributes.filter) : 0);

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
          <ChipList
            activeStatusIdx={activeStatusIdx}
            setActiveStatusIdx={setActiveStatusIdx}
            statusList={statusList}
            getStatusLabel={getStatusLabel}
            styleList={styleList}
            title={'Trạng thái'}
            style={'mb-2'}
          />
          <Stack direction='horizontal' className='mb-2 d-flex' gap={3}>
            <DropdownList
              activeStatusIdx={activeFilterIdx}
              setActiveStatusIdx={setActiveFilterIdx}
              statusList={filterList}
              getStatusLabel={getFilterLabel}
              styleList={filterStyleList}
              title={'Sắp xếp'}
            />
            <Button onClick={() => {setSortBy(sortBy === 'desc' ? 'asc' : 'desc')}}>
              {sortBy === 'desc' ? <MdOutlineSouth/> : <MdOutlineNorth/>}
            </Button>
          </Stack>
        </Row>

        {/* --- Request List --- */}
        <div>
          <RequestListForKeeper
            currentStatus={statusList[activeStatusIdx]}
            currentFilter={filterList[activeFilterIdx]}
            currentSortBy={sortBy}
            queryData={queryData}
          />
        </div>

      </Container>
    </>
  )
};

export default RequestListForKeeperPage;