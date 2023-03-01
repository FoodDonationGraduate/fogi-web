import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from "services/axios/axiosConfig.js";

const initialState = {
    user: localStorage.getItem("user") !== undefined 
        && localStorage.getItem("user") !== null 
        ? JSON.parse(localStorage.getItem("user")) : {},
    token: localStorage.getItem("token") !== undefined 
        && localStorage.getItem("token") !== null 
        ? localStorage.getItem("token") : ''
}

const authenticationReducer = createSlice({
    name: "authenticationReducer",
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.user = action.payload
            localStorage.setItem('user', JSON.stringify(action.payload))
        },
        setUserToken: (state, action) => {
            state.token = action.payload
            localStorage.setItem('token', action.payload)
        }
    }
})

export const { 
    setUserInfo, setUserToken
} = authenticationReducer.actions

export default authenticationReducer.reducer
// ----------- HELPER ---------------------

function handleExpiredToken (res, dispatch, navigate) {
    if (res.data.token === "unauthorized") {
        dispatch(setUserInfo({}))
        dispatch(setUserToken(''))
        navigate('/login')
    }
}
// ----------- THUNK ----------------------

export const login = (data, navigate) => {
    
    return async dispatch => {
        try {
            await axiosInstance.post(`/login`, {
                email: data.email,
                password: data.password
            }).then((res) => {
                if (res.data.user === undefined) {
                    dispatch(setUserInfo({}))
                    dispatch(setUserToken(''))
                    navigate('/login')
                }
                dispatch(setUserInfo(res.data.user))
                dispatch(setUserToken(res.data.token))
            })
            .catch((err) => {
                console.log(err.response.data)
            });
        } catch (err) {
            console.log(err)
        }
    }
}

export const logout = (navigate) => {
    return async dispatch => {
        try {
            console.log("logout")
            dispatch(setUserInfo({}))
            dispatch(setUserToken(''))
            navigate('/login')
        } catch (err) {
            console.log(err)
            navigate('/')
        }
    }
}

export const retrieveProfile = (user, navigate) => {
    return async dispatch => {
        try {
            console.log("retrieve profile")
            await axiosInstance.post(`/profile`, {
                email: user.userInfo.email,
                token: user.userToken
            }).then((res) => {
                handleExpiredToken(res, dispatch, navigate)
                dispatch(setUserInfo(res.data.user))
            })
            .catch((err) => {
                console.log(err.response.data)
                navigate('/')
            });
        } catch (err) {
            console.log(err)
            navigate('/')
        }
    }
}

export const updateProfile = (data, user, navigate) => {
    return async dispatch => {
        try {
            console.log("update profile")
            axiosInstance.patch(`/profile`, {
                email: user.userInfo.email,
                token: user.userToken,
                user_type: user.userInfo.user_type,
                name: data.fullname,
                phone: data.phonenumber,
                address: data.address
            }).then((res) => {
                handleExpiredToken(res, dispatch, navigate)
                dispatch(retrieveProfile(user,navigate))
            }).catch((err) => {
                console.log(err)
                navigate('/')
            });
        } catch (err) {
            console.log(err)
            navigate('/')
        }
    }
}

export const updateAvatar = (data, user, navigate) => {
    return async dispatch => {
        try {
            console.log("update avatar")
            axiosInstance.patch(`/profile`, {
                email: user.userInfo.email,
                token: user.userToken,
                user_type: user.userInfo.user_type,
                avatar: data.avatar,
            }).then((res) => {
                handleExpiredToken(res, dispatch, navigate)
                dispatch(retrieveProfile(user,navigate))
            }).catch((err) => {
                console.log(err)
                navigate('/')
            });
        } catch (err) {
            console.log(err)
            navigate('/')
        }
    }
}