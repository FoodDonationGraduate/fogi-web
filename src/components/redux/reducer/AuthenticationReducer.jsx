import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from "services/axios/axiosConfig.js";
import { setModalMessage, showModal, cancelModal } from 'components/redux/reducer/ModalReducer';

const initialState = {
    user: localStorage.getItem("user") !== "undefined" 
        && localStorage.getItem("user") !== null 
        ? JSON.parse(localStorage.getItem("user")) : {},
    token: localStorage.getItem("token") !== "undefined" 
        && localStorage.getItem("token") !== null 
        ? localStorage.getItem("token") : '',
    registeredUser: localStorage.getItem("registeredUser") !== "undefined" 
        && localStorage.getItem("registeredUser") !== null 
        ? JSON.parse(localStorage.getItem("registeredUser")) : {}
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

export const login = (data, navigate, setFailAuthentication) => {
    
    return async dispatch => {
        try {
            await axiosInstance.post(`/login`, {
                email: data.email,
                password: data.password
            }).then((res) => {
                dispatch(setUserInfo(res.data.user))
                dispatch(setUserToken(res.data.token))
                navigate('/profile')
            })
            .catch((err) => {
                if (err.response.data.message === 'User email is not verified') {
                    dispatch(signupUserAccount())
                    localStorage.setItem('currentEmail', data.email)
                    navigate('/verification')
                    dispatch(setModalMessage(`You need to verify your email first!`))
                    dispatch(showModal())
                } else if (err.response.data.message === 'Email or password is wrong') {
                    setFailAuthentication(true);
                } else {
                    dispatch(setModalMessage(`Something went wrong!`))
                    dispatch(showModal())
                }
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
                }
            })
            .catch((err) => {
                if (err.response.data.message == 'Email is already existed') {
                    navigate('/signup')
                    dispatch(setModalMessage(`Signup unsuccessfully! ${err.response.data.message}. Please signup again.`))
                    dispatch(showModal())
                } else {
                    console.log(err.response.data)
                    navigate('/')
                }
                
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
            await axiosInstance.post(`/verify/send`, {
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