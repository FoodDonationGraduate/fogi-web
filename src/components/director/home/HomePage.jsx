// Essentials
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';

// Components & Pages
import SideMenu from './components/SideMenu';
import SideMenuOffCanvas from './components/SideMenuOffCanvas';
import InfoModal from 'components/layout/InfoModal.jsx';
import ConfirmModal from 'components/layout/ConfirmModal.jsx';

import DashboardPage from './pages/dashboard/DashboardPage';
import ApproveListPage from './pages/approve/ApproveListPage';
import ManageUserPage from './pages/manage/ManageUserPage';
import CategoryListPage from './pages/category/CategoryListPage';

// Assets
import { MdMenu } from 'react-icons/md';

// Utility
import { useResizer } from 'utils/helpers/Resizer.jsx';

// Redux
import { setTypeOfUser } from 'components/redux/reducer/DirectorReducer';

// Styles
import 'assets/css/donor/HomePage.css';

const HomePage = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  let size = useResizer();

  // for SideMenu Offcanvas
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setTypeOfUser('donee');
  }, [activeIdx]);

  return (
    <>
      <SideMenuOffCanvas
        activeIdx={activeIdx}
        setActiveIdx={setActiveIdx}
        show={show}
        handleClose={handleClose}
      />
      <div className='bg'>
        <Row>
          {size > 1 && (
            <SideMenu
              activeIdx={activeIdx}
              setActiveIdx={setActiveIdx}
            />
          )}
          {size <= 1 && (
            <div className='side-menu-sm' onClick={handleShow}>
              <MdMenu className='side-menu-icon-sm' />
            </div>
          )}
          <Col>
            <Row className={`${size >= 2 && 'workspace'} py-4`}>
              <Col>
                {activeIdx === 0 && <DashboardPage />}
                {activeIdx === 1 && <ApproveListPage />}
                {activeIdx === 2 && <ManageUserPage />}
                {activeIdx === 3 && <CategoryListPage />}
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