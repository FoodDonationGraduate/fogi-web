import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from "services/axios/axiosConfig.js";

const initialState = {
    message: '',
    visibility: false,
    logic: false
}

const modalReducer = createSlice({
    name: "modalReducer",
    initialState,
    reducers: {
        setModalMessage: (state, action) => {
            state.message = action.payload
        },
        showModal: (state, action) => {
            state.visibility = true
            
        },
        hideModal: (state, action) => {
            state.visibility = false
        },
        confirmModal: (state, action) => {
            state.logic = true
        },
        cancelModal: (state, action) => {
            state.logic = false
        }
    }
})

export const { 
    setModalMessage, showModal, hideModal, confirmModal,cancelModal
} = modalReducer.actions

export default modalReducer.reducer
// ----------- HELPER ---------------------


// ----------- THUNK ----------------------
