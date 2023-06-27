import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from "services/axios/axiosConfig.js";
import { setModalMessage, showModal, hideModal } from 'components/redux/reducer/ModalReducer';
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

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

export const refreshToken = (navigate) => {
    return async dispatch => {
        const userInfo = JSON.parse(localStorage.getItem("user"));
        const userToken = localStorage.getItem("token");
        try {
            await axiosInstance.post(`/token/refresh`, {
                email: userInfo.email,
                token: userToken
            }).then((res) => {
                dispatch(setUserToken(res.data.token))
            })
            .catch((err) => {
                console.log(err)
                dispatch(setUserInfo({}))
                dispatch(setUserToken(''))
                navigate('/login')
            });
        } catch (err) {
            dispatch(setUserInfo({}))
            dispatch(setUserToken(''))
            console.log(err)
            navigate('/')
        }
    }
}

export function handleExpiredToken (data, dispatch, navigate) {
    if (data.message === "unauthorized") {
        dispatch(logout(navigate))
        return false;
    }
    return true;
}



export function handleEmptyToken (user, navigate) {
    if ((user.userInfo === undefined || Object.keys(user.userInfo).length === 0)){
        navigate('/login')
        return false;
    }
    return true;
}
// ----------- THUNK ----------------------

export const login = (data, navigate, setFailAuthentication) => {
    
    return async dispatch => {
        try {
            await axiosInstance.post(`/login`, {
                email: data.email,
                password: data.password
            }).then((res) => {
                dispatch(setUserInfo(res.data.user));
                dispatch(setUserToken(res.data.token));
                switch (res.data.user.user_type) {
                    case 'donor':
                        navigate('/donor/home');
                        break;
                    case 'director':
                        navigate('/director/home');
                        break;
                    default: navigate(-1);
                }
                // let intervalID =  setInterval(() => {
                //     const userInfo = JSON.parse(localStorage.getItem("user"));
                //     const userToken = localStorage.getItem("token");
                //     if (Object.keys(userInfo).length !== 0 && userToken !== ''){
                //         dispatch(refreshToken(navigate));
                //     }
                //   }, 5000);
            })
            .catch((err) => {
                if (err.response.data.message === 'User email is not verified') {
                    dispatch(signupUserAccount())
                    localStorage.setItem('currentEmail', data.email)
                    navigate('/verification')
                    dispatch(setModalMessage(`Bạn cần phải xác minh email của bạn!`))
                    dispatch(showModal())
                } else if (err.response.data.message === 'Email or password is wrong') {
                    setFailAuthentication(true);
                } else {
                    dispatch(setModalMessage(`Đã xảy ra lỗi!!`))
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
            dispatch(hideModal())
            localStorage.removeItem('selectedAddress')
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
                user_type: 'donee',
                password: data.password,
                address: data.address,
                dob: data.dob,
                phone: data.phone,
                name: data.name,
                avatar: '',
                id_front: data.id_front,
                id_back: data.id_back
            }).then((res) => {
                navigate('/signupsuccess')
                dispatch(removeRegisterdUser())
            })
            .catch((err) => {
                if (err.response.data.message === 'Email is already existed') {
                    dispatch(removeRegisterdUser())
                    navigate('/signup')
                    dispatch(setModalMessage(`Đăng ký không thành công! Email đã tồn tại, vui lòng đăng ký lại`))
                    dispatch(showModal())
                } else {
                    console.log(err.response.data)
                    dispatch(removeRegisterdUser())
                    navigate('/signup')
                    dispatch(setModalMessage(`Signup unsuccessfully! ${err.response.data.message}. Please signup again.`))
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
                phone: data.phone,
                name: data.name,
                avatar: '',
                id_front: data.id_front,
                id_back: data.id_back
            }).then((res) => {
                navigate('/signupsuccess')
                dispatch(removeRegisterdUser())
            })
            .catch((err) => {
                if (err.response.data.message === 'Email is already existed') {
                    dispatch(removeRegisterdUser())
                    navigate('/donor/signup')
                    dispatch(setModalMessage(`Đăng ký không thành công! Email đã tồn tại, vui lòng đăng ký lại`))
                    dispatch(showModal())
                } else {
                    console.log(err.response.data)
                    dispatch(removeRegisterdUser())
                    navigate('/donor/signup')
                    dispatch(setModalMessage(`Signup unsuccessfully! ${err.response.data.message}. Please signup again.`))
                    dispatch(showModal())
                }
            });
        } catch (err) {
            console.log(err)
            navigate('/')
        }
    }
}

// export const signupForVolunteer = (data, navigate) => {
//     return async dispatch => {
//         try {
//             console.log("signup for volunteer")
//             await axiosInstance.post(`/signup`, {
//                 email: data.email,
//                 user_type: 'volunteer',
//                 password: data.password,
//                 address: data.address,
//                 phone: data.phonenumber,
//                 name: data.name,
//                 avatar: '',
//                 id_front: data.id_front,
//                 id_back: data.id_back
//             }).then((res) => {
//                 if (res.data.message === 'Signup successfully') {
//                     navigate('/signupsuccess')
//                 }
//             })
//             .catch((err) => {
//                 if (err.response.data.message === 'Email is already existed') {
//                     dispatch(removeRegisterdUser())
//                     navigate('/volunteer/signup')
//                     dispatch(setModalMessage(`Signup unsuccessfully! ${err.response.data.message}. Please signup again.`))
//                     dispatch(showModal())
//                 } else {
//                     console.log(err.response.data)
//                     dispatch(removeRegisterdUser())
//                     navigate('/volunteer/signup')
//                      dispatch(showModal())
//                 }
//             });
//         } catch (err) {
//             console.log(err)
//             navigate('/')
//         }
//     }
// }

export const resendVerificationEmail = (data, navigate) => {
    return async dispatch => {
        try {
            console.log("resend verification email")
            await axiosInstance.post(`/verify/send`, {
                email: data.email
            }).then((res) => {
                if (res.data.message === 'Verification email sent') {
                    dispatch(setModalMessage("Email xác nhận đã được gửi! Vui lòng kiểm tra hộp thư của bạn."));
                    dispatch(showModal());
                }
            })
            .catch((err) => {
                console.log(err.response.data)
                dispatch(setModalMessage("Đã xảy ra lỗi!"));
                dispatch(showModal());
            });
        } catch (err) {
            console.log(err);
            navigate('/');
        }
    }
}

export const retrieveProfile = (user, navigate) => {
    return async dispatch => {
        try {
            console.log("retrieve profile")
            await axiosInstance.get(`/profile`, {params:{
                email: user.userInfo.email,
                token: user.userToken
            }}).then((res) => {
                dispatch(setUserInfo(res.data.user));
            })
            .catch((err) => {
                if (handleExpiredToken(err.response.data, dispatch, navigate)) {
                    console.log(err.response.data)
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
                dispatch(retrieveProfile(user, navigate));
                dispatch(setModalMessage("Cập nhật thành công!"));
                dispatch(showModal());
            }).catch((err) => {
                if (handleExpiredToken(err.response.data, dispatch, navigate)) {
                    console.log(err.response.data);
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
                dispatch(retrieveProfile(user, navigate))
                dispatch(setModalMessage("Cập nhật hình ảnh đại diện thành công"))
                dispatch(showModal())
            }).catch((err) => {
                if (handleExpiredToken(err.response.data, dispatch, navigate)) {
                    console.log(err)
                    dispatch(setModalMessage("Đã xảy ra lỗi!"))
                    dispatch(showModal())
                }
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
                dispatch(logout(navigate))
                dispatch(setModalMessage("Đổi mật khẩu thành công"))
                dispatch(showModal())
            }).catch((err) => {
                if (handleExpiredToken(err.response.data, dispatch, navigate)) {
                    console.log(err)
                    dispatch(setModalMessage("Đã xảy ra lỗi!"))
                    dispatch(showModal())
                }
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
                dispatch(setModalMessage("Đã gửi email đổi mật khẩu. Vui lòng kiểm tra hộp thư của bạn."))
                dispatch(showModal())
            }).catch((err) => {
                console.log(err)
                dispatch(setModalMessage("Đã xảy ra lỗi!"))
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
                dispatch(setModalMessage("Cập nhật mật khẩu thành công. Vui lòng đăng nhập lại."))
                dispatch(showModal())
                navigate('/login')
            }).catch((err) => {
                if (handleExpiredToken(err.response.data, dispatch, navigate)) {
                    console.log(err)
                    dispatch(setModalMessage("Đã xảy ra lỗi!"))
                    dispatch(showModal())
                }
            });
        } catch (err) {
            console.log(err)
            navigate('/')
        }
    }
}
