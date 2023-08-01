// Essentials
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

// Constants
import CategoryHeaders from 'utils/constants/headerList/CategoryHeaders.json';

// Components
import Spinner from 'components/common/Spinner';
import Table from 'components/common/management/table/Table';
import Title from 'components/common/management/common/Title';
import CategoryModal from 'components/director/home/pages/food/components/category/CategoryModal';

// Reducers
import { deleteCategory, retrieveAllCategories } from 'components/redux/reducer/CategoryReducer';
import { cancelQuestionModal, setModalQuestion, showQuestionModal } from 'components/redux/reducer/ModalReducer';

const CategoryPage = () => {
  // Constants
  const allCategories = useSelector(state => state.categoryReducer.allCategories);
  const userInfo = useSelector(state => state.authenticationReducer.user);
  const userToken = useSelector(state => state.authenticationReducer.token);
  const modalLogic = useSelector(state => state.modalReducer.logic);
  const dispatch = useDispatch(); const navigate = useNavigate();

  // Spinner
  const [isLoading, setIsLoading] = useState(false);

  // Parent Food Modal
  const [show, setShow] = useState(false);
  const onShow = () => { setShow(true); }
  const onClose = () => { setShow(false); }
  const [currentCategory, setCurrrentCategory] = useState(undefined);
  const updateCategory = (category) => {
    setCurrrentCategory(category);
    onShow();
  }
  const addCategory = () => {
    setCurrrentCategory(undefined);
    onShow();
  }
  const deleteCate = (category) => {
    setCurrrentCategory(category);
    dispatch(setModalQuestion("Bạn có muốn xóa hạng mục này không?"))
    dispatch(showQuestionModal())
    
  }
  useEffect(() => {
    if (modalLogic) {
        dispatch(cancelQuestionModal())
        dispatch(deleteCategory({id: currentCategory.id}, { userInfo, userToken }, navigate));
    }
  })

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
      sorts: JSON.stringify(sortFields),

      setIsLoading
    };

    dispatch(retrieveAllCategories(data, navigate));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, query, parentFoodCount, createdTime, updatedTime, sortFields]);

  return (
    <>
      {isLoading && <Spinner />}
      <div className='d-flex justify-content-between'>
        <Title title='Quản lý Hạng mục' />
        <Button 
          className='fogi' variant='primary'
          onClick={() => addCategory()}
        >
          Thêm Hạng mục
        </Button>
      </div>
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
        actionList={[
          { action: (category) => updateCategory(category) },
          { action: (category) => deleteCate(category) }
        ]}
      />
      <CategoryModal
        show={show} onShow={onShow} onClose={onClose} category={currentCategory}
      />
    </>
  );
};

export default CategoryPage;