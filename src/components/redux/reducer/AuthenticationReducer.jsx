import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from "services/axios/axiosConfig.js";
import { setModalMessage, showModal } from 'components/redux/reducer/ModalReducer';

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
        },
        removeRegisterdUser: (state, action) => {
            state.registeredUser = {}
            localStorage.setItem('registeredUser', JSON.stringify(state.registeredUser))
        }
    }
})

export const { 
    setUserInfo, setUserToken,
    signupUserAccount, signupUserInfo, removeRegisterdUser
} = authenticationReducer.actions

export default authenticationReducer.reducer
// ----------- HELPER ---------------------

function handleExpiredToken (data, dispatch, navigate) {
    if (data.message === "unauthorized") {
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
                if (err.response.data.message === 'Email is already existed') {
                    dispatch(removeRegisterdUser())
                    navigate('/signup')
                    dispatch(setModalMessage(`Signup unsuccessfully! ${err.response.data.message}. Please signup again.`))
                    dispatch(showModal())
                } else {
                    console.log(err.response.data)
                    dispatch(removeRegisterdUser())
                    navigate('/signup')
                     dispatch(showModal())
                }
                
            });
        } catch (err) {
            console.log(err)
            navigate('/')
        }
    }
}

export const signupForDonor = (data, navigate) => {
    return async dispatch => {
        try {
            console.log("signup for donor")
            await axiosInstance.post(`/signup`, {
                email: data.email,
                user_type: 'donor',
                password: data.password,
                address: data.address,
                phone: data.phonenumber,
                owner_name: data.ownername,
                open_time: data.openhours,
                close_time: data.closehours,
                description: data.description,
                name: data.brandname,
                avatar: '',
                storefront: '',
                owner_id_front: data.owner_id_front,
                owner_id_back: data.owner_id_back
            }).then((res) => {
                if (res.data.message === 'Signup successfully') {
                    navigate('/signupsuccess')
                }
            })
            .catch((err) => {
                if (err.response.data.message === 'Email is already existed') {
                    dispatch(removeRegisterdUser())
                    navigate('/donor/signup')
                    dispatch(setModalMessage(`Signup unsuccessfully! ${err.response.data.message}. Please signup again.`))
                    dispatch(showModal())
                } else {
                    console.log(err.response.data)
                    dispatch(removeRegisterdUser())
                    navigate('/donor/signup')
                     dispatch(showModal())
                }
            });
        } catch (err) {
            console.log(err)
            navigate('/')
        }
    }
}

export const signupForVolunteer = (data, navigate) => {
    return async dispatch => {
        try {
            console.log("signup for volunteer")
            await axiosInstance.post(`/signup`, {
                email: data.email,
                user_type: 'volunteer',
                password: data.password,
                address: data.address,
                phone: data.phonenumber,
                name: data.name,
                avatar: '',
                id_front: data.id_front,
                id_back: data.id_back
            }).then((res) => {
                if (res.data.message === 'Signup successfully') {
                    navigate('/signupsuccess')
                }
            })
            .catch((err) => {
                if (err.response.data.message === 'Email is already existed') {
                    dispatch(removeRegisterdUser())
                    navigate('/volunteer/signup')
                    dispatch(setModalMessage(`Signup unsuccessfully! ${err.response.data.message}. Please signup again.`))
                    dispatch(showModal())
                } else {
                    console.log(err.response.data)
                    dispatch(removeRegisterdUser())
                    navigate('/volunteer/signup')
                     dispatch(showModal())
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
                dispatch(setModalMessage("Something went wrong!"))
                dispatch(showModal())
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
                dispatch(setUserInfo(res.data.user))
            })
            .catch((err) => {
                handleExpiredToken(err.response.data, dispatch, navigate)
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

export const patchProfile = (data, user, navigate) => {
    return async dispatch => {
        try {
            console.log("update profile")
            axiosInstance.patch(`/profile`, {
                email: user.userInfo.email,
                token: user.userToken,
                user_type: user.userInfo.user_type,
                ...data
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

export const changePassword = (data, user, navigate) => {
    return async dispatch => {
        try {
            console.log("change password")
            axiosInstance.post(`/change_password`, {
                email: user.userInfo.email,
                token: user.userToken,
                password: data.password,
                new_password: data.new_password
            }).then((res) => {
                handleExpiredToken(res, dispatch, navigate)
                dispatch(logout(navigate))
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

export const forgotPassword = (data, navigate) => {
    return async dispatch => {
        try {
            console.log("forgot password")
            axiosInstance.post(`/forgot_password`, {
                email: data.email,
            }).then((res) => {
                handleExpiredToken(res, dispatch, navigate)
                dispatch(setModalMessage("Reset password email was sent! Please verify your email."))
                dispatch(showModal())
            }).catch((err) => {
                console.log(err)
                dispatch(setModalMessage("Something went wrong"))
                dispatch(showModal())
            });
        } catch (err) {
            console.log(err)
            navigate('/')
        }
    }
}

export const resetPassword = (data, navigate) => {
    return async dispatch => {
        try {
            console.log("reset password")
            axiosInstance.post(`/callback/forgot_password`, {
                email: data.email,
                token: data.token,
                password: data.password
            }).then((res) => {
                handleExpiredToken(res, dispatch, navigate)
                dispatch(setModalMessage("Reset password successfully! Please login again"))
                dispatch(showModal())
                navigate('/login')
            }).catch((err) => {
                console.log(err)
                dispatch(setModalMessage("Something went wrong"))
                dispatch(showModal())
            });
        } catch (err) {
            console.log(err)
            navigate('/')
        }
    }
}