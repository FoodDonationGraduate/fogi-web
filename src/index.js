import React, {useState} from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import { Provider } from "react-redux";

import store from "./components/redux/store.jsx";
import HomePage from "./components/guest/home_page/HomePage.jsx"

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
      </Routes>
     </BrowserRouter >
  </Provider>
);
