import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from "services/axios/axiosConfig.js";
import { setModalMessage, showModal, cancelModal } from 'components/redux/reducer/ModalReducer';

const initialState = {
    user: localStorage.getItem("user") !== undefined 
        && localStorage.getItem("user") !== null 
        ? JSON.parse(localStorage.getItem("user")) : {},
    token: localStorage.getItem("token") !== undefined 
        && localStorage.getItem("token") !== null 
        ? localStorage.getItem("token") : '',
    registeredUser: localStorage.getItem("registeredUser") !== undefined 
        && localStorage.getItem("registeredUser") !== null 
        ? JSON.parse(localStorage.getItem("registeredUser")) : {},
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
        },
        signupUserAccount: (state, action) => {
            state.registeredUser = action.payload
            localStorage.setItem('registeredUser', JSON.stringify(action.payload))
        },
        signupUserInfo: (state, action) => {
            state.registeredUser = {...state.registeredUser, ...action.payload}
            localStorage.setItem('registeredUser', JSON.stringify(state.registeredUser))
            console.log(state.registeredUser)
        }
    }
})

export const { 
    setUserInfo, setUserToken,
    signupUserAccount, signupUserInfo
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

export const signup = (data, navigate) => {
    return async dispatch => {
        try {
            console.log("signup for user")
            await axiosInstance.post(`/signup`, {
                email: data.email,
                user_type: 'user',
                password: data.password,
                address: data.address,
                dob: data.dob,
                phone: data.phonenumber,
                name: data.fullname,
                avatar: '',
                reputation: 0
            }).then((res) => {
                if (res.data.message === 'Signup successfully') {
                    navigate('/signupsuccess')
                } else {
                    navigate('/signup')
                    dispatch(setModalMessage("Signup unsuccessfully! Please signup again."))
                    dispatch(showModal())
                }
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

export const resendVerificationEmail = (data, navigate) => {
    return async dispatch => {
        try {
            console.log("resend verification email")
            await axiosInstance.get(`/verify/send`, {
                email: data.email
            }).then((res) => {
                if (res.data.message === 'Verification email sent') {
                    dispatch(setModalMessage("Verification email was sent! Please verify your email."))
                    dispatch(showModal())
                }
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
