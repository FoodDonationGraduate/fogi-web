// Essentials
import React, { useState, useEffect } from 'react';
import { Container, Row, Stack, Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

// Components
import ManageItemList from './components/ManageItemList';
import ManageDetails from './components/ManageDetails';
import ChipList from 'components/common/chip/ChipList';

// Redux
import { setTypeOfUser } from 'components/redux/reducer/DirectorReducer';

// Form handling
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const ManageUserPage = () => {
  const dispatch = useDispatch();
  
  // users attributes
  const usersAttributes = JSON.parse(localStorage.getItem('usersAttributes'));

  // Chip List
  const [activeStatusIdx, setActiveStatusIdx] = useState(0);
  const statusList = ['donee', 'donor', 'volunteer'];
  const getStatusLabel = (status) => {
    switch (status) {
      case 'donee':
        return 'Người nhận';
      case 'donor':
        return 'Người cho';
      default:
        return 'Tình nguyện viên';
    }
  };
  const styleList = ['success', 'success', 'success'];

  useEffect(() => {
    dispatch(setTypeOfUser(statusList[activeStatusIdx]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStatusIdx]);

  // Details
  const [targetUser, setTargetUser] = useState(null);

  // Handle search users
  const [queryData, setQueryData] = useState(usersAttributes ? usersAttributes.query : '');
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
        <Container>
          {!targetUser && 
            <>
              <Row className='mb-4'>
                <Stack direction='horizontal' className='mb-2 d-flex' gap={3}>
                  <h2 className='fw-bold me-auto'>Quản lý Người dùng</h2>
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
                />
              </Row>
              <ManageItemList 
                setTargetUser={setTargetUser}
                queryData={queryData} />
            </>
          }
          {targetUser &&
            <ManageDetails user={targetUser} setTargetUser={setTargetUser} />
          }
          
        </Container>
      </div>
    </>
  );
};

export default ManageUserPage;
