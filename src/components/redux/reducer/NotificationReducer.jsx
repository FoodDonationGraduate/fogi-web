import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from "services/axios/axiosConfig.js";
import { setModalMessage, showModal } from './ModalReducer';

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

// export const retrieveAllDonors = (data, navigate) => {
//     return async dispatch => {
//         try {
//             console.log("retrieve all categories")
//             await axiosInstance.get(`/donor`, {params: {
//                 limit: data.limit,
//                 offset: data.offset
//             }}).then((res) => {
//                 dispatch(setAllDonors(res.data))
//             })
//             .catch((err) => {
//                 console.log(err)
//                 dispatch(setModalMessage(`Đã xảy ra lỗi!`))
//                 dispatch(showModal())
//             });
//         } catch (err) {
//             console.log(err)
//             navigate('/')
//         }
//     }
// }

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
                console.log(err)
            });
        } catch (err) {
            console.log(err)
            navigate('/')
        }
    }
}