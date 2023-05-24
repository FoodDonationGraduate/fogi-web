import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from "services/axios/axiosConfig.js";
import { setModalMessage, showModal } from './ModalReducer';
import { handleExpiredToken } from './AuthenticationReducer';

const initialState = {
    allAdresses: {},
    currentAddress: {}
}
const addressReducer = createSlice({
    name: "addressReducer",
    initialState,
    reducers: {
        setAllAddresses: (state, action) => {
            state.allAdresses = action.payload
        },
        setCurrentAddress: (state, action) => {
            state.currentAddress = action.payload
        }
    }
})

export const { 
    setAllAddresses, setCurrentAddress
} = addressReducer.actions

export default addressReducer.reducer
// ----------- HELPER ---------------------

// ----------- THUNK ----------------------
export const retrieveAllAddresses = (user, navigate) => {
    return async dispatch => {
        try {
            console.log("retrieve all addresses")
            await axiosInstance.get(`/address/` + user.userInfo.user_type, {params: {
                email: user.userInfo.email,
                token: user.userToken
            }}).then((res) => {
                dispatch(setAllAddresses(res.data))
            })
            .catch((err) => {
                if (handleExpiredToken(err.response.data, dispatch, navigate)) {
                    console.log(err)
                    dispatch(setModalMessage(err.response.data.message))
                    dispatch(showModal())
                    dispatch(setAllAddresses({}))
                }
            });
        } catch (err) {
            console.log(err)
            navigate('/')
        }
    }
}

export const retrieveAddress = (data, user, navigate) => {
    return async dispatch => {
        try {
            console.log("retrieve address with id: " + data.id)
            await axiosInstance.get(`/address/` + user.userInfo.user_type, {params: {
                email: user.userInfo.email,
                token: user.userToken,
                id: data.id
            }}).then((res) => {
                dispatch(setCurrentAddress(res.data))
            })
            .catch((err) => {
                if (handleExpiredToken(err.response.data, dispatch, navigate)) {
                    console.log(err)
                    dispatch(setModalMessage(err.response.data.message))
                    dispatch(showModal())
                    dispatch(setCurrentAddress({}))
                }
            });
        } catch (err) {
            console.log(err)
            navigate('/')
        }
    }
}

export const addNewAddress = (data, user, navigate) => {
    return async dispatch => {
        try {
            console.log("add new address")
            await axiosInstance.post(`/address/` + user.userInfo.user_type, {
                email: user.userInfo.email,
                token: user.userToken,
                name: data.name,
                address: data.address,
                lat: data.lat,
                long: data.long
            }).then((res) => {
                dispatch(retrieveAllAddresses(user, navigate))
                dispatch(setModalMessage('Thêm địa chỉ mới thành công'))
                dispatch(showModal())
            })
            .catch((err) => {
                if (handleExpiredToken(err.response.data, dispatch, navigate)) {
                    console.log(err)
                    dispatch(setModalMessage(err.response.data.message))
                    dispatch(showModal())
                }
            });
        } catch (err) {
            console.log(err)
            navigate('/')
        }
    }
}

export const updateAddress = (data, user, navigate) => {
    return async dispatch => {
        try {
            console.log("update address with id: " + data.id)
            await axiosInstance.patch(`/address/` + user.userInfo.user_type, {
                email: user.userInfo.email,
                token: user.userToken,
                id: data.id,
                name: data.name,
                address: data.address,
                lat: data.lat,
                long: data.long
            }).then((res) => {
                dispatch(retrieveAllAddresses(user, navigate))
                dispatch(setModalMessage('Cập nhật địa chỉ thành công'))
                dispatch(showModal())
            })
            .catch((err) => {
                if (handleExpiredToken(err.response.data, dispatch, navigate)) {
                    console.log(err)
                    dispatch(setModalMessage(err.response.data.message))
                    dispatch(showModal())
                }
            });
        } catch (err) {
            console.log(err)
            navigate('/')
        }
    }
}

// export const deleteProduct = (data, user, navigate) => {
//     return async dispatch => {
//         try {
//             console.log("delete product in cart")
//             await axiosInstance.delete(`/cart`, {params: {
//                 email: user.userInfo.email,
//                 token: user.userToken,
//                 product_id: data.product_id
//             }}).then((res) => {
//                 dispatch(retrieveAllProducts({}, user, navigate))
//             })
//             .catch((err) => {
//                 if (handleExpiredToken(err.response.data, dispatch, navigate)) {
//                     console.log(err)
//                     dispatch(setModalMessage(err.response.data.message))
//                     dispatch(showModal())
//                 }
//             });
//         } catch (err) {
//             console.log(err)
//             navigate('/')
//         }
//     }
// }