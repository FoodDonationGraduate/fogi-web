import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from 'services/axios/axiosConfig.js';
import { handleExpiredToken } from './AuthenticationReducer';
import { setModalMessage, showModal } from './ModalReducer';

import { retrieveAllCategories } from 'components/redux/reducer/CategoryReducer';

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
      console.log(`retrieve unverified ${data.user_type}`);
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
      console.log(`${data.action} user`);
      await axiosInstance.patch(`/verify/info`, {
        email: director.userInfo.email,
        token: director.userToken,
        user_email: data.email,
        action: data.action
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

export const addCategory = (data, director, navigate) => {
  return async dispatch => {
    try {
      console.log('add category');
      axiosInstance.post(`/category`, {
        email: director.userInfo.email,
        token: director.userToken,
        name: data.name,
        description: data.name,
        image: data.image
      }).then((res) => {
        dispatch(retrieveAllCategories(navigate));
        dispatch(setModalMessage("Thêm Phân loại thành công!"));
        dispatch(showModal());
      }).catch((err) => {
        if (handleExpiredToken(err.response.data, dispatch, navigate)) {
          console.log(err);
          dispatch(setModalMessage("Đã xảy ra lỗi!"));
          dispatch(showModal());
        }
      });
    } catch (err) {
      console.log(err);
      navigate('/');
    }
  }
}