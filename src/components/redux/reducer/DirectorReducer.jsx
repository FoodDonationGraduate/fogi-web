import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from 'services/axios/axiosConfig.js';
import { handleExpiredToken } from './AuthenticationReducer';
import { setModalMessage, showModal } from './ModalReducer';

const initialState = {
  unverifiedUsers: {}
};

const directorReducer = createSlice({
  name: 'directorReducer',
  initialState,
  reducers: {
    setUnverifiedUsers: (state, action) => {
      state.unverifiedUsers = action.payload
    }
  }
});

export const {
  setUnverifiedUsers
} = directorReducer.actions

export default directorReducer.reducer

export const retrieveUnverifiedUsers = (data, user, navigate) => {
  return async dispatch => {
    try {
      console.log('retrieve unverified users');
      await axiosInstance.get(`/verify/info`, { params: {
        email: user.userInfo.email,
        token: user.userToken,
        user_type: data.user_type,
        limit: data.limit,
        offset: data.offset
      }}).then((res) => {
        handleExpiredToken(res, dispatch, navigate);
        dispatch(setUnverifiedUsers(res.data));
      }).catch((err) => {
        console.log(err.response.data);
      });
    } catch (err) {
      console.log(err);
      navigate('/');
    }
  }
}