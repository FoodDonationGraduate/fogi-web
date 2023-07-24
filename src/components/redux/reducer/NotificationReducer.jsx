import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from "services/axios/axiosConfig.js";
import { setModalMessage, setModalType, showModal } from './ModalReducer';
import { handleExpiredToken } from './AuthenticationReducer';

const initialState = {
    allNotifications: {}
}
const notificationReducer = createSlice({
    name: "notificationReducer",
    initialState,
    reducers: {
        setAllNotifications: (state, action) => {
            state.allNotifications = action.payload
        }
    }
})

export const { 
    setAllNotifications
} = notificationReducer.actions

export default notificationReducer.reducer
// ----------- HELPER ---------------------

// ----------- THUNK ----------------------

export const retrieveAllNotifications = (data, user, navigate) => {
    return async dispatch => {
        try {
            console.log("retrieve all notifications")
            await axiosInstance.get(`/notification`, {params: {
                email: user.userInfo.email,
                token: user.userToken,
                limit: data.limit ? data.limit : 20,
                offset: data.offset ? data.offset : 0,
                noti_type: data.noti_type ? data.noti_type : ''
            }}).then((res) => {
                dispatch(setAllNotifications(res.data))
            })
            .catch((err) => {
                if (handleExpiredToken(err.response.data, dispatch, navigate)) {
                } else {
                    console.log(err)
                }
                dispatch(setAllNotifications({}))
            });
        } catch (err) {
            console.log(err)
            navigate('/')
        }
    }
}


export const updateNotification = (data, user, navigate) => {
    return async dispatch => {
        var result = false;
        try {
            console.log("update notification")
            await axiosInstance.patch(`/notification`, {
                email: user.userInfo.email,
                token: user.userToken,
                noti_type: data.noti_type,
                noti_status: data.noti_status,
                id: data.id
            }).then((res) => {
            })
            .catch((err) => {
                if (handleExpiredToken(err.response.data, dispatch, navigate)) {
                } else {
                    console.log(err)
                }
            });
        } catch (err) {
            console.log(err)
            navigate('/')
        }
        return result;
    }
}

export const sendDeviceToken = (data, user, navigate) => {
    return async dispatch => {
        try {
            console.log("send device token to backend")
            await axiosInstance.post(`/notification`, {
                email: user.userInfo.email,
                token: user.userToken,
                device_token: data.device_token
            }).then((res) => {
                console.log("Send device token to backend successfully")
            })
            .catch((err) => {
                if (handleExpiredToken(err.response.data, dispatch, navigate)) {
                } else {
                    console.log(err)
                }
            });
        } catch (err) {
            console.log(err)
            navigate('/')
        }
    }
}