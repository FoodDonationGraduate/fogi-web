// Essentials
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

// Constants
import CategoryHeaders from 'utils/constants/headerList/CategoryHeaders.json';

// Components
import Table from 'components/common/management/table/Table';
import Title from 'components/common/management/common/Title';

// Reducers
import { retrieveAllCategories } from 'components/redux/reducer/CategoryReducer';

const CategoryPage = () => {
  // Constants
  const allCategories = useSelector(state => state.categoryReducer.allCategories);
  const dispatch = useDispatch(); const navigate = useNavigate();

  // Filters
  const [query, setQuery] = useState(null);
  const [parentFoodCount, setParentFoodCount] = useState([]);
  const [createdTime, setCreatedTime] = useState({ min: '', max: '' });
  const [updatedTime, setUpdatedTime] = useState({ min: '', max: '' });

  // Sort Field
  const [sortFields, setSortFields] = useState([]);

  // Pagination handling
  const CATEGORY_COUNT = 16; // per page
  const [page, setPage] = useState(0); // a.k.a activeIdx

  // Get requests
  useEffect(() => {
    setPage(0);
  }, [query, parentFoodCount, createdTime, updatedTime, sortFields]);

  useEffect(() => { 
    var data = {
      limit: CATEGORY_COUNT,
      offset: page * CATEGORY_COUNT,
      query: query,
      num_product_filter: JSON.stringify(parentFoodCount),
      min_created_time: createdTime.min,
      max_created_time: createdTime.max,
      min_updated_time: updatedTime.min,
      max_updated_time: updatedTime.max,
      sorts: JSON.stringify(sortFields)
    };

    dispatch(retrieveAllCategories(data, navigate));
  }, [page, query, parentFoodCount, createdTime, updatedTime, sortFields]);

  return (
    <>
      <Title title='Quản lý Hạng mục' />
      <Table
        headerList={CategoryHeaders.allHeaders}
        filterList={[
          { state: query, setState: setQuery },
          { state: parentFoodCount, setState: setParentFoodCount },
          { state: createdTime, setState: setCreatedTime },
          { state: updatedTime, setState: setUpdatedTime }
        ]}
        itemList={allCategories.categories}
        total={allCategories.total_categories} pageCount={CATEGORY_COUNT} page={page} setPage={setPage}
        sortFields={sortFields} setSortFields={setSortFields}
        type='category'
      />
    </>
  );
};

export default CategoryPage;