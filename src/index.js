import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Navigate, Route, Routes, useLocation, Outlet} from "react-router-dom";
import { useSelector } from 'react-redux'
import { Provider } from "react-redux";

import store from "./components/redux/store.jsx";
import HomePage from "./components/guest/home/HomePage.jsx";
import ProductListPage from './components/guest/product/ProductListPage.jsx';
import NewProductListPage from './components/guest/product/NewProductListPage.jsx';
import AmootProductListPage from './components/guest/product/AmootProductListPage.jsx';
import ProductDetailsPage from './components/guest/product/ProductDetailsPage.jsx';
import CategoryProductListPage from './components/guest/product/CategoryProductListPage.jsx';
import DonorListPage from './components/guest/donor/DonorListPage.jsx';
import EmptyProductListPage from './components/guest/product/EmptyProductListPage.jsx';
import NotFoundPage from './components/common/PageNotFoundPage.jsx';

import UserLogin from "./components/guest/authentication/LoginPage.jsx";
import UserSignup from "./components/guest/authentication/SignupPage.jsx";
import UserAccountInfo from "./components/guest/authentication/AccountInfoPage.jsx";
import SuccessSignup from "./components/guest/authentication/SuccessSignupPage.jsx";
import SuccessVerify from "./components/guest/authentication/SuccessVerifyPage.jsx";
import Verification from "./components/guest/authentication/VerificationPage.jsx";
import VerifyEmail from "./components/guest/authentication/VerifyEmailPage.jsx";
import AccountType from "./components/guest/authentication/AccountTypePage.jsx";
import ForgotPassword from "./components/guest/authentication/ForgotPasswordPage.jsx";
import ChangePassword from "./components/guest/authentication/ChangePasswordPage.jsx";
import CartPage from './components/user/cart/CartPage.jsx';
import OrderListPage from './components/user/order/list/OrderListPage.jsx';
import OrderDetailsPage from './components/user/order/details/OrderDetailsPage.jsx';

import DonorSignup from "./components/donor/authentication/SignupPage.jsx";
import DonorAccountInfo from "./components/donor/authentication/AccountInfoPage.jsx";
import DonorHome from "./components/donor/home/HomePage.jsx"
import DonorOrderDetailsPage from "./components/donor/home/pages/orders/details/OrderDetailsPage.jsx"

import ProfileUserPage from "./components/user/profile_page/ProfilePage.jsx"
import ProfileDonorPage from "./components/donor/profile_page/ProfilePage.jsx"
import ProfileDirectorPage from "./components/director/profile_page/ProfilePage.jsx"

import DirectorHome from "./components/director/home/HomePage.jsx";

import TestPage from "./components/TestPage.jsx";

import Darkreader from "react-darkreader";

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />        
        <Route path="/products" element={<ProductListPage />} /> 
        <Route path="/donors" element={<DonorListPage />} /> 
        <Route path="/new-products" element={<NewProductListPage />} />  
        <Route path="/almost-out-of-stock-products" element={<AmootProductListPage />} />  
        <Route path="/empty-products" element={<EmptyProductListPage />} />  
        
        <Route path="*" element={<NotFoundPage />} />
        
        <Route path="/category/:id" element={<CategoryProductListPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />

        <Route path="/login" element={<UserLogin />} />
        <Route path="/accounttype" element={<AccountType />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/accountinfo" element={<UserAccountInfo />} />
        <Route path="/signupsuccess" element={<SuccessSignup />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/verifyemail" element={<VerifyEmail />} />
        <Route path="/verifysuccess" element={<SuccessVerify />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/callback/forgotpassword" element={<ChangePassword />} />

        <Route path="/donor/signup" element={<DonorSignup/>} />
        <Route path="/donor/accountinfo" element={<DonorAccountInfo/>} />

        <Route path="/" element={
            <Auth allowedRoles={["donee", "donor", "director", "warehouse_keeper"]} />}
        >
          <Route path="/profile" element={
            <Monitor allowedPages={[<ProfileUserPage/>, <ProfileDonorPage/>, <ProfileDirectorPage/>, <ProfileDirectorPage/>]}/> } 
          />
        </Route>

        <Route path="/" element={
            <Auth allowedRoles={["donee"]} />}
        >
          <Route path="/donate-bag" element={<CartPage />} />
          <Route path="/requests" element={<OrderListPage />} />
          <Route path="/request/:id"  element={<OrderDetailsPage />} />
        </Route>

          <Route path="/donor" element={
              <Auth allowedRoles={["donor"]} />}
          >
            <Route path="/donor/dashboard" element={ <DonorHome activeIdx={0} /> } />
            <Route path="/donor/donate-bag" element={ <DonorHome activeIdx={1} /> } />
            <Route path="/donor/requests" element={ <DonorHome activeIdx={2} /> } />

            <Route path="/donor/request/:id" element={ <DonorOrderDetailsPage/> } />
          </Route>

          <Route path="/director" element={
              <Auth allowedRoles={["director"]} />}
          >
            <Route path="/director/dashboard" element={ <DirectorHome activeIdx={0} /> } />
            <Route path="/director/requests" element={ <DirectorHome activeIdx={1} /> } />
            <Route path="/director/request/:from/:id" element={ <DirectorHome activeIdx={1} /> } />
            <Route path="/director/categories" element={ <DirectorHome activeIdx={3} /> } />
            <Route path="/director/category/:categoryId" element={ <DirectorHome activeIdx={4} /> } />
            <Route path="/director/parent-food" element={ <DirectorHome activeIdx={4} /> } />
            <Route path="/director/parent-food/:parentFoodId" element={ <DirectorHome activeIdx={4} /> } />
            <Route path="/director/approve" element={ <DirectorHome activeIdx={5} /> } />
            <Route path="/director/users" element={ <DirectorHome activeIdx={6} /> } />
            <Route path="/director/user/:userType/:userEmail" element={ <DirectorHome activeIdx={6} /> } />
            <Route path="/director/news" element={ <DirectorHome activeIdx={7} /> } />
          </Route>

          <Route path="/warehouse_keeper" element={
              <Auth allowedRoles={["warehouse_keeper"]} />}
          >
            <Route path="/warehouse_keeper/requests" element={ <DirectorHome activeIdx={1} /> } />
            <Route path="/warehouse_keeper/request/:from/:id" element={ <DirectorHome activeIdx={1} /> } />
            <Route path="/warehouse_keeper/unsorted-food" element={ <DirectorHome activeIdx={2} /> } />
            <Route path="/warehouse_keeper/categories" element={ <DirectorHome activeIdx={3} /> } />
            <Route path="/warehouse_keeper/category/:categoryId" element={ <DirectorHome activeIdx={4} /> } />
            <Route path="/warehouse_keeper/parent-food" element={ <DirectorHome activeIdx={4} /> } />
            <Route path="/warehouse_keeper/parent-food/:parentFoodId" element={ <DirectorHome activeIdx={4} /> } />
          </Route>

          <Route path="/test" element={ <TestPage /> } />
        </Routes>
      </BrowserRouter >
    </Provider>
    {/* for darkmode */}
    <div
      style={{
        position: "fixed",
        bottom: "0",
        right: "0",
        zIndex: "999",
        padding: "10px",
      }}
    >
      <Darkreader />
    </div>
  </>
);

function Auth ({ allowedRoles }) {
  const userInfo = useSelector(state => state.authenticationReducer.user)
  // const userToken = useSelector(state => state.authenticationReducer.token)
  const location = useLocation();
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // let intervalID = userToken !== '' ? setInterval(() => {
  //   const userInfo = JSON.parse(localStorage.getItem("user"));
  //   const userToken = localStorage.getItem("token");
  //   if (Object.keys(userInfo).length !== 0 && userToken !== ''){
  //       dispatch(refreshToken(navigate));
  //   }
  // }, 5000) : '';

  localStorage.allowedRoles = JSON.stringify(allowedRoles);
  
  return (userInfo === undefined || Object.keys(userInfo).length === 0) ? (
    <Navigate to="/login" state={{ from: location }} replace />
  ) : (
    allowedRoles.find((role) => userInfo.user_type.includes(role)) ? (
      <Outlet />
    ) : (
      <NotFoundPage/>
    ) 
  );
};

function Monitor ({allowedPages}) {
  const userInfo = useSelector(state => state.authenticationReducer.user)
  const allowedRolesObj = JSON.parse(localStorage.allowedRoles)
  const allowedRolesArr = [];
  Object.keys(allowedRolesObj).map((key) => allowedRolesArr.push(allowedRolesObj[key]));
  return Object.keys(localStorage.allowedRoles).length === 1 ? 
    allowedPages[0] :
    allowedPages[allowedRolesObj.indexOf(userInfo.user_type)]
}