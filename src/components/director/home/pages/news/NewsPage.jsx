// Essentials
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

// Constants
import NewsHeaders from 'utils/constants/headerList/NewsHeaders.json';

// Components
import Spinner from 'components/common/Spinner';
import Table from 'components/common/management/table/Table';
import Title from 'components/common/management/common/Title';
import NewsModal from './components/NewsModal';

// Reducers
import { retrieveAllNews, deleteNews } from 'components/redux/reducer/NewsReducer';
import { cancelQuestionModal, setModalQuestion, showQuestionModal } from 'components/redux/reducer/ModalReducer';

const NewsPage = () => {
  // Constants
  const allNews = useSelector(state => state.newsReducer.allNews);
  const userInfo = useSelector(state => state.authenticationReducer.user);
  const userToken = useSelector(state => state.authenticationReducer.token);
  const dispatch = useDispatch(); const navigate = useNavigate();
  const modalLogic = useSelector(state => state.modalReducer.logic);

  // Spinner
  const [isLoading, setIsLoading] = useState(false);

  const [filterData, setFilterData] = useState({});

  // Filters
  const [query, setQuery] = useState(null);
  const [createdTime, setCreatedTime] = useState({ min: '', max: '' });
  const [updatedTime, setUpdatedTime] = useState({ min: '', max: '' });

  // Sort Field
  const [sortFields, setSortFields] = useState([]);

  // Pagination handling
  const NEWS_COUNT = 16; // per page
  const [page, setPage] = useState(0); // a.k.a activeIdx

  // Get requests
  useEffect(() => {
    setPage(0);
  }, [query, createdTime, updatedTime, sortFields]);

  useEffect(() => { 
    var data = {
      limit: NEWS_COUNT,
      offset: page * NEWS_COUNT,
      query: query,
      min_created_time: createdTime.min,
      max_created_time: createdTime.max,
      min_updated_time: updatedTime.min,
      max_updated_time: updatedTime.max,
      sorts: JSON.stringify(sortFields),

      setIsLoading
    };

    setFilterData(data);

    dispatch(retrieveAllNews(data, navigate));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, query, createdTime, updatedTime, sortFields]);

  // Details modal
  const [targetNews, setTargetNews] = useState(null);
  const [show, setShow] = useState(false);
  const [modalType, setModalType] = useState(null);
  const onShow = () => setShow(true);
  const onHide = () => setShow(false);

  const onDeleteNews = (news) => {
    setTargetNews(news);
    dispatch(setModalQuestion("Bạn có muốn xóa tin này không?"));
    dispatch(showQuestionModal());
  }
  
  useEffect(() => {
    if (modalLogic) {
        dispatch(cancelQuestionModal())
        dispatch(deleteNews({ id: targetNews.id, filterData }, { userInfo, userToken }, navigate));
    }
  });

  return (
    <>
      {isLoading && <Spinner />}
      <div className='d-flex justify-content-between'>
        <Title title='Quản lý Tin tức' />
        <Button 
          className='fogi' variant='primary'
          onClick={() => { onShow(); setModalType('create') }}
        >
          Thêm Tin tức
        </Button>
      </div>
      <Table
        headerList={NewsHeaders.allHeaders}
        filterList={[
          { state: query, setState: setQuery },
          {},
          { state: createdTime, setState: setCreatedTime },
          { state: updatedTime, setState: setUpdatedTime }
        ]}
        itemList={allNews.news}
        total={allNews.total_news} pageCount={NEWS_COUNT} page={page} setPage={setPage}
        sortFields={sortFields} setSortFields={setSortFields}
        type='news'
        actionList={[
          { action: (news) => { setTargetNews(news); setModalType('read'); } },
          { action: () => onShow() },
          { action: (news) => { onDeleteNews(news); }}
        ]}
      />
      {modalType &&
        <NewsModal
          news={targetNews}
          show={show} onHide={onHide}
          type={modalType}
          filterData={filterData}
        />
      }
    </>
  );
};

export default NewsPage;