// Essentials
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Col, Row, Stack } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

// Components & Pages
import SideMenu from 'components/common/management/sideMenu/SideMenu';
import InfoModal from 'components/layout/InfoModal.jsx';
import ConfirmModal from 'components/layout/ConfirmModal.jsx';

import DashboardPage from './pages/dashboard/DashboardPage';
import RequestPage from './pages/request/RequestPage';
import UnsortedFoodPage from './pages/food/UnsortedFoodPage';
import CategoryPage from './pages/food/CategoryPage';
import ParentFoodPage from './pages/food/ParentFoodPage';
import FoodPage from './pages/food/FoodPage';
import ApproveListPage from './pages/approve/ApproveListPage';
import UserListPage from './pages/manage/UserListPage'
import UserPage from './pages/manage/UserPage';

// Assets
import {
  MdOutlineAnalytics,
  MdOutlineArticle,
  MdOutlineCategory,
  MdOutlineShoppingBag,
  MdOutlineFastfood,
  MdCheckCircleOutline,
  MdOutlineGroup // 4
} from 'react-icons/md';

// Redux
import { setTypeOfUser } from 'components/redux/reducer/DirectorReducer';

// Styles
import 'assets/css/donor/HomePage.css';

// Side Menu
const sideMenuInfoList = [
  {
    user_type: 'director',
    menu: [
      { idx: 0, label: 'Thống kê', link: 'dashboard', icon: MdOutlineAnalytics },
      { idx: 1, label: 'Yêu cầu', link: 'requests', icon: MdOutlineArticle },
      { idx: 3, label: 'Hạng mục', link: 'categories', icon: MdOutlineCategory },
      { idx: 4, label: 'Hạng mục con', link: 'parent-food', icon: MdOutlineShoppingBag },
      { idx: 5, label: 'Xét duyệt', link: 'approve', icon: MdCheckCircleOutline },
      { idx: 6, label: 'Người dùng', link: 'users', icon: MdOutlineGroup },
    ]
  },
  {
    user_type: 'warehouse_keeper',
    menu: [
      { idx: 1, label: 'Yêu cầu', link: 'requests', icon: MdOutlineArticle },
      { idx: 2, label: 'Phân loại Thực phẩm', link: 'unsorted-food', icon: MdOutlineFastfood },
      { idx: 3, label: 'Hạng mục', link: 'categories', icon: MdOutlineCategory },
      { idx: 4, label: 'Hạng mục con', link: 'parent-food', icon: MdOutlineShoppingBag }
    ]
  }
];



const HomePage = ({
  activeIdx
}) => {
  const userInfo = useSelector(state => state.authenticationReducer.user);
  const { parentFoodId, userEmail } = useParams();

  const menu = sideMenuInfoList.find(m => m.user_type === userInfo.user_type).menu;

  useEffect(() => {
    setTypeOfUser('donee');
  }, [activeIdx]);

  return (
    <>
      <div className='bg'>
        <Row>
          <SideMenu
            activeIdx={activeIdx}
            sideMenuInfoList={menu}
            userType={userInfo.user_type}
          />
          <Col>
            <Row className='mn-workspace'>
              <Col>
                <Stack direction='vertical' gap={3}>
                  {userInfo.user_type === 'director' && <>
                    {activeIdx === 0 && <DashboardPage />}
                    {activeIdx === 5 && <ApproveListPage />}
                    {activeIdx === 6 && (!userEmail ? <UserListPage /> : <UserPage />)}
                  </>}
                  {userInfo.user_type === 'warehouse_keeper' && <>
                    {activeIdx === 2 && <UnsortedFoodPage />}
                  </>}
                  {activeIdx === 1 && <RequestPage />}
                  {activeIdx === 3 && <CategoryPage />}
                  {activeIdx === 4 && (!parentFoodId ? <ParentFoodPage /> : <FoodPage />)}
                </Stack>
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