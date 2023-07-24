// Essentials
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

// Constants
import ParentFoodHeaders from 'utils/constants/headerList/ParentFoodHeaders.json';

// Components
import Table from 'components/common/management/table/Table';
import Title from 'components/common/management/common/Title';
import SubCategoryModal from 'components/director/home/pages/food/components/parentFood/SubCategoryModal';

// Reducers
import { retrieveAllParentFood } from 'components/redux/reducer/DirectorReducer';
import { retrieveAllCategories } from 'components/redux/reducer/CategoryReducer';

const ParentFoodPage = () => {
  // Constants
  const allParentFood = useSelector(state => state.directorReducer.allParentFood);
  const allCategories = useSelector(state => state.categoryReducer.allCategories);
  const userInfo = useSelector(state => state.authenticationReducer.user);
  const userToken = useSelector(state => state.authenticationReducer.token);
  const dispatch = useDispatch(); const navigate = useNavigate();
  const { categoryId } = useParams();

  // SubCategory Modal
  const [show, setShow] = useState(false);
  const onShow = () => { setShow(true); }
  const onClose = () => { setShow(false); }

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
  const FOOD_COUNT = 16; // per page
  const [page, setPage] = useState(0); // a.k.a activeIdx

  // Get category if endpoint is like '/category/:categoryId'
  useEffect(() => {
    if (!categoryId) return;
    dispatch(retrieveAllCategories({}, navigate));
  }, [categoryId]);

  useEffect(() => {
    if (!allCategories.categories) return;

    const category = allCategories.categories.find(c => c.id === parseInt(categoryId));
    if (category) {
      setCategoryList([{
        value: category.id,
        image: category.image,
        label: category.name
      }])
    }
  }, [allCategories]);

  const [first, setFirst] = useState(false);
  useEffect(() => { // Redirect to '/parent-food' from '/category/categoryId'
    if (!first) { setFirst(true); return; }
    if (!categoryId) return;
    if (categoryList.length === 1) return;
    navigate(`/${userInfo.user_type}/parent-food`);
  }, [categoryList]);

  // Get parent food
  useEffect(() => {
    setPage(0);
  }, [query, categoryList, stock, unit, createdTime, updatedTime, sortFields]);

  useEffect(() => { 
    var data = {
      limit: FOOD_COUNT,
      offset: page * FOOD_COUNT,
      search_query: query,
      stock_filter: JSON.stringify(stock),
      unit: unit.value,
      category_ids: JSON.stringify(categoryList.map(category => category.value)),
      min_created_time: createdTime.min,
      max_created_time: createdTime.max,
      min_updated_time: updatedTime.min,
      max_updated_time: updatedTime.max,
      sorts: JSON.stringify(sortFields)
    };

    dispatch(retrieveAllParentFood(
      data,
      { userInfo, userToken },
      navigate
    ));
  }, [page, query, categoryList, stock, unit, createdTime, updatedTime, sortFields]);

  return (
    <>
      <div className='d-flex justify-content-between'>
        <Title title='Quản lý Hạng mục con' />
        <Button 
          className='fogi' variant='primary'
          onClick={onShow}
        >
          Thêm Hạng mục con
        </Button>
      </div>
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
        total={allParentFood.total_products} pageCount={FOOD_COUNT} page={page} setPage={setPage}
        sortFields={sortFields} setSortFields={setSortFields}
        type='parent-food'
      />
      <SubCategoryModal
        show={show} onShow={onShow} onClose={onClose}
      />
    </>
  );
};

export default ParentFoodPage;