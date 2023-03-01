import React, {useState} from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate, Outlet} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { Provider } from "react-redux";

import store from "./components/redux/store.jsx";
import HomePage from "./components/guest/home/HomePage.jsx";
import ProductListPage from './components/guest/product/ProductListPage.jsx';
import ProductDetailsPage from './components/guest/product/ProductDetailsPage.jsx';

import UserLogin from "./components/guest/authentication/LoginPage.jsx";
import UserSignup from "./components/guest/authentication/SignupPage.jsx";
import UserAccountInfo from "./components/guest/authentication/AccountInfoPage.jsx";
import UserOTPMethod from "./components/guest/authentication/OTPMethodPage.jsx";
import UserOTPInputPage from "./components/guest/authentication/OTPInputPage.jsx";

import DonorLogin from "./components/donor/authentication/LoginPage.jsx";
import DonorSignup from "./components/donor/authentication/SignupPage.jsx";
import DonorOTPMethod from "./components/donor/authentication/OTPMethodPage.jsx";
import DonorOTPInput from "./components/donor/authentication/OTPInputPage.jsx";
import DonorAccountInfo from "./components/donor/authentication/AccountInfoPage.jsx";

import VolunteerLogin from "./components/volunteer/authentication/LoginPage.jsx";
import VolunteerSignup from "./components/volunteer/authentication/SignupPage.jsx";
import VolunteerOTPMethod from "./components/volunteer/authentication/OTPMethodPage.jsx";
import VolunteerOTPInput from "./components/volunteer/authentication/OTPInputPage.jsx";
import VolunteerAccountInfo from "./components/volunteer/authentication/AccountInfoPage.jsx";

import ProfileUserPage from "./components/user/profile_page/ProfilePage.jsx"

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/productlist" element={<ProductListPage />} />
        <Route path="/productdetails" element={<ProductDetailsPage />} />

        <Route path="/login" element={<UserLogin/>} />
        <Route path="/signup" element={<UserSignup/>} />
        <Route path="/accountinfo" element={<UserAccountInfo/>} />
        <Route path="/otpmethod" element={<UserOTPMethod/>} />
        <Route path="/otpinput" element={<UserOTPInputPage/>} />

        <Route path="/donor/login" element={<DonorLogin/>} />
        <Route path="/donor/signup" element={<DonorSignup/>} />
        <Route path="/donor/otpmethod" element={<DonorOTPMethod/>} />
        <Route path="/donor/otpinput" element={<DonorOTPInput/>} />
        <Route path="/donor/accountinfo" element={<DonorAccountInfo/>} />

        <Route path="/volunteer/login" element={<VolunteerLogin/>} />
        <Route path="/volunteer/signup" element={<VolunteerSignup/>} />
        <Route path="/volunteer/otpmethod" element={<VolunteerOTPMethod/>} />
        <Route path="/volunteer/otpinput" element={<VolunteerOTPInput/>} />
        <Route path="/volunteer/accountinfo" element={<VolunteerAccountInfo/>} />
        
        <Route path="/" element={
            <Auth allowedRoles={["user", "donor", "volunteer"]} />}
        >
          <Route path="/profile" element={
            <Monitor allowedPages={[<ProfileUserPage/>, <ProfileUserPage/>, <ProfileUserPage/>]}/> } 
          />
          
        </Route>
        <Route path="/donor" element={
            <Auth allowedRoles={["donor"]} />}
        >
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

  localStorage.allowedRoles = allowedRoles;
  let user = localStorage.user;

  // console.log("[+] user:" + user + user["email"]);
  // console.log(userInfo);

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
  return Object.keys(localStorage.allowedRoles).length === 1 ? 
    allowedPages[0] :
    allowedPages[localStorage.allowedRoles.indexOf(userInfo.user_type)]
}