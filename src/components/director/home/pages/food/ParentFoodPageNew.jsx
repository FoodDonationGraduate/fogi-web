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
  const [categoryList, setCategoryList] = useState([]);
  const [stock, setStock] = useState([]);
  const [unit, setUnit] = useState({ value: '', label: 'Tất cả' })
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
      limit: REQUEST_COUNT,
      offset: page * REQUEST_COUNT,
      search_query: query,
      stock_filter: JSON.stringify(stock),
      unit: unit.value,
      category_ids: JSON.stringify(categoryList.map(category => category.value)),
      min_created_time: createdTime.min,
      max_created_time: createdTime.max,
      min_updated_time: updatedTime.min,
      max_updated_time: updatedTime.max
    };

    dispatch(retrieveAllParentFood(
      data,
      { userInfo, userToken },
      navigate
    ));
  }, [query, categoryList, stock, unit, createdTime, updatedTime]);

  return (
    <>
      {JSON.stringify(categoryList.map(category => category.value))}
      <Title title='Quản lý Yêu cầu' />
      <Table
        headerList={ParentFoodHeaders.allHeaders}
        filterList={[
          { state: query, setState: setQuery },
          { state: categoryList, setState: setCategoryList },
          { state: stock, setState: setStock },
          { state: unit, setState: setUnit },
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