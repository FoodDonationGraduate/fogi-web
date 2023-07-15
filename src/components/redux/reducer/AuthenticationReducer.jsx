import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from "services/axios/axiosConfig.js";
import { setModalMessage, showModal, hideModal, setModalType } from 'components/redux/reducer/ModalReducer';
import { retrieveAllProducts } from './CartReducer';
import { enableNotification } from 'utils/helpers/Notification';
import { removeSelectedAddress } from './AddressReducer';

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
    if (data.exit_code === 401) {
        dispatch(logout(navigate))
        dispatch(setModalMessage(`Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại!`))
        dispatch(setModalType('danger'));
        dispatch(showModal())
        return true;
    }
    return false;
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
                let user = {userInfo: res.data.user, userToken: res.data.token}
                switch (res.data.user.user_type) {
                    case 'donor':
                        navigate('/donor/dashboard');
                        break;
                    case 'director':
                        navigate('/director/dashboard');
                        break;
                    case 'warehouse_keeper':
                        navigate('/warehouse_keeper/categories');
                        break;
                    case 'volunteer':
                        dispatch(logout(navigate));
                        dispatch(setModalMessage(`Vui lòng sử dụng app dành riêng cho tình nguyện viên!`));
                        dispatch(showModal());
                        break;
                    default: 
                        dispatch(retrieveAllProducts({}, user, navigate));
                        navigate(-1);
                }
                enableNotification(dispatch, navigate, user);
            })
            .catch((err) => {
                if (err.response.data.exit_code === 404) {
                    dispatch(signupUserAccount())
                    localStorage.setItem('currentEmail', data.email)
                    navigate('/verification')
                    dispatch(setModalMessage(`Email chưa được xác minh. Vui lòng xác minh email của bạn!`))
                    dispatch(setModalType('danger'));
                    dispatch(showModal())
                } else if (err.response.data.exit_code === 403) {
                    dispatch(setModalMessage(`Xin lỗi, tài khoản của bạn hiện đang bị khóa. Vui lòng liên hệ hỗ trợ để được trợ giúp.!`))
                    dispatch(setModalType('danger'));
                    dispatch(showModal())
                } else if (err.response.data.exit_code === 402) {
                    setFailAuthentication(true);
                } else {
                    dispatch(setModalMessage(`Đã xảy ra lỗi!!`))
                    dispatch(setModalType('danger'));
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
            //
            localStorage.removeItem('requestAttributes');
            localStorage.removeItem('usersAttributes');
            // 
            dispatch(removeSelectedAddress())
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
                if (err.response.data.exit_code === 405) {
                    dispatch(removeRegisterdUser())
                    navigate('/signup')
                    dispatch(setModalMessage(`Email đã tồn tại. Vui lòng sử dụng email khác!`))
                    dispatch(setModalType('danger'));
                    dispatch(showModal())
                } else {
                    console.log(err.response.data)
                    dispatch(removeRegisterdUser())
                    navigate('/signup')
                    dispatch(setModalMessage(`Đăng ký không thành công!`))
                    dispatch(setModalType('danger'));
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
                if (err.response.data.exit_code === 405) {
                    dispatch(removeRegisterdUser())
                    navigate('/donor/signup')
                    dispatch(setModalMessage(`Email đã tồn tại. Vui lòng sử dụng email khác!`))
                    dispatch(setModalType('danger'));
                    dispatch(showModal())
                } else {
                    console.log(err.response.data)
                    dispatch(removeRegisterdUser())
                    navigate('/donor/signup')
                    dispatch(setModalMessage(`Đăng ký không thành công!`))
                    dispatch(setModalType('danger'));
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
                    dispatch(setModalMessage("Email xác nhận đã được gửi! Vui lòng kiểm tra hộp thư của bạn."));
                    dispatch(showModal());
                }
            })
            .catch((err) => {
                console.log(err.response.data)
                dispatch(setModalMessage("Đã xảy ra lỗi!"));
                dispatch(setModalType('danger'));
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
                } else {
                    console.log(err)
                    dispatch(setModalMessage("Đã xảy ra lỗi!"))
                    dispatch(setModalType('danger'));
                    dispatch(showModal())
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
            }).then(() => {
                dispatch(retrieveProfile(user, navigate));
                dispatch(setModalMessage("Cập nhật thành công"));
                dispatch(showModal());
            }).catch((err) => {
                if (handleExpiredToken(err.response.data, dispatch, navigate)) {
                } else {
                    console.log(err)
                    dispatch(setModalMessage("Cập nhật không thành công!"));
                    dispatch(setModalType('danger'));
                    dispatch(showModal())
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
                } else {
                    console.log(err)
                    dispatch(setModalMessage("Cập nhật hình ảnh đại diện không thành công!"))
                    dispatch(setModalType('danger'));
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
                } else {
                    console.log(err)
                    dispatch(setModalMessage("Đổi mật khẩu không thành công!"))
                    dispatch(setModalType('danger'));
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
                dispatch(setModalType('danger'));
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
                } else {
                    console.log(err)
                    dispatch(setModalMessage("Cập nhật mật khẩu không thành công!"))
                    dispatch(setModalType('danger'));
                    dispatch(showModal())
                }
            });
        } catch (err) {
            console.log(err)
            navigate('/')
        }
    }
}
