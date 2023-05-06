import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from 'services/axios/axiosConfig.js';
import { handleExpiredToken } from './AuthenticationReducer';
import { setModalMessage, showModal } from './ModalReducer';

const initialState = {
  unverifiedDonees: {},
  unverifiedVolunteers: {},
  user_type: 'donee'
};

const directorReducer = createSlice({
  name: 'directorReducer',
  initialState,
  reducers: {
    setUnverifiedDonees: (state, action) => {
      state.unverifiedDonees = action.payload
    },
    setUnverifiedVolunteers: (state, action) => {
      state.unverifiedVolunteers = action.payload
    },
    setTypeOfUser: (state, action) => {
      state.user_type = action.payload
    }
  }
});

export const {
  setUnverifiedDonees, setUnverifiedVolunteers, setTypeOfUser
} = directorReducer.actions

export default directorReducer.reducer

export const retrieveUnverifiedDonees = (data, director, navigate) => {
  return async dispatch => {
    try {
      console.log('retrieve unverified donees');
      await axiosInstance.get(`/verify/info`, { params: {
        email: director.userInfo.email,
        token: director.userToken,
        user_type: 'donee',
        limit: data.limit,
        offset: data.offset
      }}).then((res) => {
        dispatch(setUnverifiedDonees(res.data));
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

export const retrieveUnverifiedVolunteers = (data, director, navigate) => {
  return async dispatch => {
    try {
      console.log('retrieve unverified volunteers');
      await axiosInstance.get(`/verify/info`, { params: {
        email: director.userInfo.email,
        token: director.userToken,
        user_type: 'volunteer',
        limit: data.limit,
        offset: data.offset
      }}).then((res) => {
        dispatch(setUnverifiedVolunteers(res.data));
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
        if (data.user_type === 'donee') dispatch(retrieveUnverifiedDonees(data, director, navigate));
        else dispatch(retrieveUnverifiedVolunteers(data, director, navigate));
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