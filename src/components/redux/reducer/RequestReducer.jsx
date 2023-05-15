import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from "services/axios/axiosConfig.js";
import { setModalMessage, showModal } from './ModalReducer';
import { handleExpiredToken } from './AuthenticationReducer';

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

