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

import DonorSignup from "./components/donor/authentication/SignupPage.jsx";
import DonorAccountInfo from "./components/donor/authentication/AccountInfoPage.jsx";
import DonorHome from "./components/donor/home/HomePage.jsx"

import VolunteerSignup from "./components/volunteer/authentication/SignupPage.jsx";
import VolunteerAccountInfo from "./components/volunteer/authentication/AccountInfoPage.jsx";

import ProfileUserPage from "./components/user/profile_page/ProfilePage.jsx"
import ProfileVolunteerPage from "./components/volunteer/profile_page/ProfilePage.jsx"
import ProfileDonorPage from "./components/donor/profile_page/ProfilePage.jsx"

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/products" element={<ProductListPage />} /> 
        <Route path="/donors" element={<DonorListPage />} /> 
        <Route path="/new-products" element={<NewProductListPage />} />  
        <Route path="/almost-out-of-stock-products" element={<AmootProductListPage />} />  
        
        <Route path="/category/:name" element={<CategoryProductListPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/store/:id" element={<ProductDetailsPage />} />

        <Route path="/login" element={<UserLogin />} />
        <Route path="/accounttype" element={<AccountType />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/accountinfo" element={<UserAccountInfo />} />
        <Route path="/signupsuccess" element={<SuccessSignup />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/verifyemail" element={<VerifyEmail />} />
        <Route path="/verifysuccess" element={<SuccessVerify />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/changepassword" element={<ChangePassword />} />

        <Route path="/donor/signup" element={<DonorSignup/>} />
        <Route path="/donor/accountinfo" element={<DonorAccountInfo/>} />

        <Route path="/volunteer/signup" element={<VolunteerSignup/>} />
      <Route path="/volunteer/accountinfo" element={<VolunteerAccountInfo/>} />
        
        <Route path="/" element={
            <Auth allowedRoles={["user", "donor", "volunteer"]} />}
        >
          <Route path="/profile" element={
            <Monitor allowedPages={[<ProfileUserPage/>, <ProfileDonorPage/>, <ProfileVolunteerPage/>]}/> } 
          />
        </Route>
        <Route path="/donor" element={
            <Auth allowedRoles={["donor"]} />}
        >
          <Route path="/donor/home" element={ <DonorHome/> } />
        </Route>
        <Route path="/volunteer" element={
            <Auth allowedRoles={["volunteer"]} />}
        >
        </Route>
      </Routes>
     </BrowserRouter >
  </Provider>
);

function Auth ({ allowedRoles }) {
  const userInfo = useSelector(state => state.authenticationReducer.user)
  const location = useLocation();

  localStorage.allowedRoles = JSON.stringify(allowedRoles);

  return userInfo === undefined || Object.keys(userInfo).length === 0 ? (
    <Navigate to="/login" state={{ from: location }} replace />
  ) : (
    allowedRoles.find((role) => userInfo.user_type.includes(role)) ? (
      <Outlet />
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
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