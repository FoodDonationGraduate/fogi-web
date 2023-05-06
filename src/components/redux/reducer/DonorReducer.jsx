import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from "services/axios/axiosConfig.js";
import { setModalMessage, showModal } from './ModalReducer';
import { handleExpiredToken } from './AuthenticationReducer';

const initialState = {
    allDonors: {}
}
const categoryReducer = createSlice({
    name: "donorReducer",
    initialState,
    reducers: {
        setAllDonors: (state, action) => {
            state.allDonors = action.payload
        }
    }
})

export const { 
    setAllDonors
} = categoryReducer.actions

export default categoryReducer.reducer
// ----------- HELPER ---------------------

// ----------- THUNK ----------------------

export const retrieveAllDonors = (data, navigate) => {
    return async dispatch => {
        try {
            console.log("retrieve all categories")
            await axiosInstance.get(`/donor`, {params: {
                limit: data.limit,
                offset: data.offset
            }}).then((res) => {
                dispatch(setAllDonors(res.data))
            })
            .catch((err) => {
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

