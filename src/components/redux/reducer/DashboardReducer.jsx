import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from 'services/axios/axiosConfig.js';
import { handleExpiredToken } from './AuthenticationReducer';
import { setModalMessage, showModal, setModalType } from 'components/redux/reducer/ModalReducer';

const initialState = {
  stats: {},
  chart: {}
};

const dashboardReducer = createSlice({
  name: 'dashboardReducer',
  initialState,
  reducers: {
    setStats: (state, action) => {
      state.stats = action.payload
    },
    setChart: (state, action) => {
      state.chart = action.payload
    }
  }
});

export const {
  setStats, setChart
} = dashboardReducer.actions

export default dashboardReducer.reducer

export const retrieveStats = (data, user, navigate) => {
  return async dispatch => {
    try {
      console.log('retrieve stats');
      await axiosInstance.get(`/stats/${user.userInfo.user_type}`, { params: {
        email: user.userInfo.email,
        token: user.userToken,
        stats_type: data.stats_type
      }}).then((res) => {
        dispatch(setStats(res.data));
      }).catch((err) => {
        if (handleExpiredToken(err.response.data, dispatch, navigate)) {
        } else {
          console.log(err.response.data);
          dispatch(setModalMessage("Đã xảy ra lỗi!"))
          dispatch(setModalType('danger'))
          dispatch(showModal())
       }
      });
    } catch (err) {
      console.log(err);
      navigate('/');
    }
  }
};

export const retrieveChart = (data, user, navigate) => {
  let parameters = {
    email: user.userInfo.email,
    token: user.userToken,
    chart_type: data.chart_type,
    time_type: data.time_type
  };
  if (user.userInfo.user_type === 'director') {
    switch (data.chart_type) {
      case 'user':
        parameters.user_type = data.user_type;
        break;
      default:
        parameters.request_type = data.request_type;
    }
  }
  if (user.userInfo.user_type === 'donor') {
    if (data.chart_type === 'food') parameters.unit = data.unit_type;
  }

  return async dispatch => {
    try {
      console.log('retrieve chart');
      await axiosInstance.get(`/${user.userInfo.user_type}/chart`, { params: parameters
      }).then((res) => {
        dispatch(setChart(res.data));
      }).catch((err) => {
        if (handleExpiredToken(err.response.data, dispatch, navigate)) {
        } else {
          console.log(err.response.data);
          dispatch(setModalMessage("Đã xảy ra lỗi!"))
          dispatch(setModalType('danger'))
          dispatch(showModal())
       }
      });
    } catch (err) {
      console.log(err);
      navigate('/');
    }
  }
};