import React, {useState} from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import { Provider } from "react-redux";

import store from "./components/redux/store.jsx";
import HomePage from "./components/guest/home_page/HomePage.jsx";

import LoginPage from "./components/guest/authentication/LoginPage.jsx";
import SignupPage from "./components/guest/authentication/SignupPage.jsx";
import AccountInfoPage from "./components/guest/authentication/AccountInfoPage.jsx";
import OTPMethodPage from "./components/guest/authentication/OTPMethodPage.jsx";
import OTPInputPage from "./components/guest/authentication/OTPInputPage.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />

        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/accountinfo" element={<AccountInfoPage/>} />
        <Route path="/otpmethod" element={<OTPMethodPage/>} />
        <Route path="/otpinput" element={<OTPInputPage/>} />
      </Routes>
     </BrowserRouter >
  </Provider>
);
