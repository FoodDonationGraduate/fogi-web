// Essentials
import * as React from 'react';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';

// Components & Pages
import SideMenu from 'components/common/sideMenu/SideMenu';
import SideMenuOffCanvas from 'components/common/sideMenu/SideMenuOffCanvas';
import InfoModal from 'components/layout/InfoModal.jsx';
import ConfirmModal from 'components/layout/ConfirmModal.jsx';

import DashboardPage from './pages/dashboard/DashboardPage';
import ProductListPage from './pages/products/ProductListPage';
import OrderListPage from './pages/orders/list/OrderListPage';

// Assets
import {
  MdMenu,
  MdOutlineAnalytics, // 0
  MdOutlineArticle, // 1
  MdOutlineShoppingBag, // 2
  MdCheckCircleOutline, // 3
  MdOutlineGroup // 4
} from 'react-icons/md';

// Utility
import { useResizer } from 'utils/helpers/Resizer.jsx';

// Styles
import 'assets/css/donor/HomePage.css';

// Side Menu
const sideMenuInfoList = [
  {
    idx: 0,
    label: 'Thống kê',
    link: 'dashboard',
    icon: MdOutlineAnalytics
  },
  {
    idx: 1,
    label: 'Túi Quyên góp',
    link: 'donate-bag',
    icon: MdOutlineShoppingBag
  },
  {
    idx: 2,
    label: 'Yêu cầu',
    link: 'requests',
    icon: MdOutlineArticle
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
              userType={'donor'}
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
                {activeIdx === 1 && <ProductListPage />}
                {activeIdx === 2 && <OrderListPage />}
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