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
import ApproveListPage from './pages/approve/ApproveListPage';
import ManageUserPage from './pages/manage/ManageUserPage';
import FoodPage from './pages/food/FoodPage';

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
    label: 'Thực phẩm',
    link: 'food'
  },
  {
    idx: 3,
    label: 'Xét duyệt',
    link: 'approve'
  },
  {
    idx: 4,
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
                {activeIdx === 2 && <FoodPage />}
                {activeIdx === 3 && <ApproveListPage />}
                {activeIdx === 4 && <ManageUserPage />}
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