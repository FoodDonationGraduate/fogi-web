import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from "services/axios/axiosConfig.js";
import { setModalMessage, showModal } from './ModalReducer';
import { handleExpiredToken } from './AuthenticationReducer';
import { retrieveDonorProducts } from './ProductReducer';

const initialState = {
    allRequests: {},
    currentRequest: {},
    sort: ''
}
const cartReducer = createSlice({
    name: "cartReducer",
    initialState,
    reducers: {
        setAllRequests: (state, action) => {
            state.allRequests = action.payload
        },
        setCurrentRequest: (state, action) => {
            state.currentRequest = action.payload
        },
        setTypeOfSort: (state, action) => {
            state.sort = action.payload
        },
    }
})

export const { 
    setAllRequests, setCurrentRequest, setTypeOfSort
} = cartReducer.actions

export default cartReducer.reducer
// ----------- HELPER ---------------------

// ----------- THUNK ----------------------
export const retrieveAllRequests = (data, user, navigate) => {
    return async dispatch => {
        try {
            console.log("retrieve all requests")
            data = Object.keys(data).length === 0 ? {limit: 4, offset: 0, sort_field: 'created_time'} : data
            await axiosInstance.get(`/request/`+user.userInfo.user_type, {params: {
                email: user.userInfo.email,
                token: user.userToken,
                limit: data.limit,
                offset: data.offset,
                sort_field: data.sort_field,
                request_status: data.request_status
            }}).then((res) => {
                dispatch(setAllRequests(res.data))
            })
            .catch((err) => {
                if (handleExpiredToken(err.response.data, dispatch, navigate)) {
                    console.log(err)
                    dispatch(setModalMessage(err.response.data.message))
                    dispatch(showModal())
                    dispatch(setAllRequests({}))
                }
            });
        } catch (err) {
            console.log(err)
            navigate('/')
        }
    }
}

export const retrieveRequest = (data, user, navigate) => {
    return async dispatch => {
        try {
            console.log("retrieve one request")
            await axiosInstance.get(`/request/`+user.userInfo.user_type, {params: {
                email: user.userInfo.email,
                token: user.userToken,
                request_id: data.request_id
            }}).then((res) => {
                dispatch(setCurrentRequest(res.data))
            })
            .catch((err) => {
                if (handleExpiredToken(err.response.data, dispatch, navigate)) {
                    console.log(err)
                    dispatch(setModalMessage(err.response.data.message))
                    dispatch(showModal())
                    dispatch(setCurrentRequest({}))
                }
            });
        } catch (err) {
            console.log(err)
            navigate('/')
        }
    }
}

export const postDonorRequest = (user, navigate) => {
    return async dispatch => {
        try {
            console.log("post donor's request")
            await axiosInstance.post(`/request/donor`, {
                email: user.userInfo.email,
                token: user.userToken,
                address: user.userInfo.address,
                lat: 0,
                long: 0
            }).then((res) => {
                dispatch(setModalMessage('Create new request successfully!'))
                dispatch(showModal())
                dispatch(retrieveDonorProducts({}, user, navigate))
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

export const postDoneeRequest = (data, user, navigate) => {
    return async dispatch => {
        try {
            console.log("post donee's request")
            await axiosInstance.post(`/request/donee`, {
                email: user.userInfo.email,
                token: user.userToken,
                reason: data.reason,
                address: "227 Đ. Nguyễn Văn Cừ, Phường 4, Quận 5, Thành phố Hồ Chí Minh",
                lat: 10.7628356,
                long: 106.6824824
            }).then((res) => {
                dispatch(setModalMessage('Create new request successfully!'))
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

export const updateRequest = (data, user, navigate) => {
    return async dispatch => {
        try {
            console.log("retrieve one request")
            await axiosInstance.patch(`/request/`+user.userInfo.user_type, {
                email: user.userInfo.email,
                token: user.userToken,
                request_id: data.request_id,
                request_status: data.request_status
            }).then((res) => {
                dispatch(setModalMessage((data.request_status === 'canceled' ? 'Cancel' : 'Update') + ' request successfully!'))
                dispatch(showModal())
                user.userInfo.user_type === 'donor' ? navigate('/donor/home') : navigate('/requests')
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