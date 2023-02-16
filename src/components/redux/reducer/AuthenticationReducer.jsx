import { createSlice } from '@reduxjs/toolkit'
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "services/axios/axiosConfig.js";

const initialState = {
    user: {},
    token: ''
}

const authenticationReducer = createSlice({
    name: "authenticationReducer",
    initialState,
    reducers: {
        getUserInfo: (state, action) => {
            state.user = action.payload
        },
        getUserToken: (state, action) => {
            state.token = action.payload
        }
    }
})

export const { 
    getUserInfo, getUserToken
} = authenticationReducer.actions

export default authenticationReducer.reducer

// ----------- THUNK ----------------------

export const login = (data) => {
    return async dispatch => {
        try {
            axiosInstance.post(`/login`, {
                email: data.email,
                password: data.password
            }).then((res) => {
                dispatch(getUserInfo(res.data.user))
                dispatch(getUserToken(res.data.token))
            })
            .catch((err) => {
                console.log(err.response.data)
            });
        } catch (err) {
            console.log(err)
        }
    }
}