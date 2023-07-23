// Essentials
import React, { useState, useEffect } from 'react';
import { Stack } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

// Constants
import ParentFoodHeaders from 'utils/constants/headerList/ParentFoodHeaders.json';

// Components
import Table from 'components/common/management/table/Table';
import Title from 'components/common/management/common/Title';

// Reducers
import { retrieveAllParentFood } from 'components/redux/reducer/DirectorReducer';

const ParentFoodPage = () => {
  // Constants
  const allParentFood = useSelector(state => state.directorReducer.allParentFood);
  const userInfo = useSelector(state => state.authenticationReducer.user);
  const userToken = useSelector(state => state.authenticationReducer.token);
  const dispatch = useDispatch(); const navigate = useNavigate();

  // Filters
  const [query, setQuery] = useState(null);
  
  const [stock, setStock] = useState([]);

  const [createdTime, setCreatedTime] = useState({ min: '', max: '' });
  const [updatedTime, setUpdatedTime] = useState({ min: '', max: '' });

  // Sort Field
  const [sortFields, setSortFields] = useState([]);

  // Pagination handling
  const REQUEST_COUNT = 16; // per page
  const [page, setPage] = useState(0); // a.k.a activeIdx
  const onChangePage = (idx) => {
    setPage(idx);
  };

  // Get requests
  useEffect(() => { 
    var data = {
      search_query: query
    };

    dispatch(retrieveAllParentFood(
      data,
      { userInfo, userToken },
      navigate
    ));
  }, [query, stock, createdTime, updatedTime
  ]);

  return (
    <>
      <Title title='Quản lý Yêu cầu' />
      <Table
        headerList={ParentFoodHeaders.allHeaders}
        filterList={[
          { state: query, setState: setQuery },
          {},
          { state: stock, setState: setStock },
          {},
          { state: createdTime, setState: setCreatedTime },
          { state: updatedTime, setState: setUpdatedTime }
        ]}
        itemList={allParentFood.products}
        sortFields={sortFields} setSortFields={setSortFields}
        type='parent-food'
      />
    </>
  );
};

export default ParentFoodPage;