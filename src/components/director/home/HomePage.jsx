// Essentials
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';

// Components & Pages
import SideMenu from 'components/common/sideMenu/SideMenu';
import SideMenuOffCanvas from 'components/common/sideMenu/SideMenuOffCanvas';
import InfoModal from 'components/layout/InfoModal.jsx';
import ConfirmModal from 'components/layout/ConfirmModal.jsx';

import DashboardPage from './pages/dashboard/DashboardPage';
import RequestPage from './pages/request/RequestPage';
import UnsortedFoodPage from './pages/food/UnsortedFoodPage';
import CategoryPage from './pages/food/CategoryPage';
import ParentFoodPage from './pages/food/ParentFoodPage';
import ApproveListPage from './pages/approve/ApproveListPage';
import ManageUserPage from './pages/manage/ManageUserPage';

// Assets
import { MdMenu } from 'react-icons/md';

// Utility
import { useResizer } from 'utils/helpers/Resizer.jsx';

// Redux
import { setTypeOfUser } from 'components/redux/reducer/DirectorReducer';

// Styles
import 'assets/css/donor/HomePage.css';

// Side Menu
const sideMenuInfoList = [
  {
    idx: 0,
    label: 'Thống kê',
    link: 'dashboard'
  },
  {
    idx: 1,
    label: 'Yêu cầu',
    link: 'requests'
  },
  {
    idx: 2,
    label: 'Phân loại Thực phẩm',
    link: 'unsorted-food'
  },
  {
    idx: 3,
    label: 'Hạng mục',
    link: 'categories'
  },
  {
    idx: 4,
    label: 'Thực phẩm Đại diện',
    link: 'parent-food'
  },
  {
    idx: 5,
    label: 'Xét duyệt',
    link: 'approve'
  },
  {
    idx: 6,
    label: 'Người dùng',
    link: 'users'
  }
];

const HomePage = ({
  activeIdx
}) => {
  let size = useResizer();

  // for SideMenu Offcanvas
  const [show, setShow] = useState(false);
  const onShow = () => setShow(true);
  const onHide = () => setShow(false);

  useEffect(() => {
    setTypeOfUser('donee');
  }, [activeIdx]);

  return (
    <>
      <SideMenuOffCanvas
        activeIdx={activeIdx}
        show={show} onHide={onHide}
        sideMenuInfoList={sideMenuInfoList}
        userType={'director'}
      />
      <div className='bg'>
        <Row>
          {size > 1 && (
            <SideMenu
              activeIdx={activeIdx}
              sideMenuInfoList={sideMenuInfoList}
              userType={'director'}
            />
          )}
          {size <= 1 && (
            <div className='side-menu-sm' onClick={onShow}>
              <MdMenu className='side-menu-icon-sm' />
            </div>
          )}
          <Col>
            <Row className={`${size >= 2 ? 'workspace' : ''} py-4`}>
              <Col>
                {activeIdx === 0 && <DashboardPage />}
                {activeIdx === 1 && <RequestPage />}
                {activeIdx === 2 && <UnsortedFoodPage />}
                {activeIdx === 3 && <CategoryPage />}
                {activeIdx === 4 && <ParentFoodPage />}
                {activeIdx === 5 && <ApproveListPage />}
                {activeIdx === 6 && <ManageUserPage />}
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <InfoModal/>
      <ConfirmModal/>
    </>
  );
};

export default HomePage;