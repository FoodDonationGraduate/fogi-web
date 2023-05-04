import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from 'services/axios/axiosConfig.js';
import { handleExpiredToken } from './AuthenticationReducer';
import { setModalMessage, showModal } from './ModalReducer';

const initialState = {
  unverifiedUsers: {},
  user_type: 'donee'
};

const directorReducer = createSlice({
  name: 'directorReducer',
  initialState,
  reducers: {
    setUnverifiedUsers: (state, action) => {
      state.unverifiedUsers = action.payload
    },
    setTypeOfUser: (state, action) => {
      state.user_type = action.payload
    }
  }
});

export const {
  setUnverifiedUsers, setTypeOfUser
} = directorReducer.actions

export default directorReducer.reducer

export const retrieveUnverifiedUsers = (data, director, navigate) => {
  return async dispatch => {
    try {
      console.log('retrieve unverified users');
      await axiosInstance.get(`/verify/info`, { params: {
        email: director.userInfo.email,
        token: director.userToken,
        user_type: data.user_type,
        limit: data.limit,
        offset: data.offset
      }}).then((res) => {
        dispatch(setUnverifiedUsers(res.data));
      }).catch((err) => {
        console.log(err.response.data);
        navigate('/');
      });
    } catch (err) {
      console.log(err);
      navigate('/');
    }
  }
}

export const verifyUser = (data, director, navigate) => {
  return async dispatch => {
    try {
      console.log('verify user');
      await axiosInstance.patch(`/verify/info`, {
        email: director.userInfo.email,
        token: director.userToken,
        user_email: data.email
      }).then((res) => {
        handleExpiredToken(res, dispatch, navigate);
        dispatch(retrieveUnverifiedUsers(data, director, navigate));
      }).catch((err) => {
        console.log(err);
        navigate('/');
      });
    } catch (err) {
      console.log(err);
      navigate('/');
    }
  }
}