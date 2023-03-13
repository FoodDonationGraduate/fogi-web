import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from "services/axios/axiosConfig.js";
import { setModalMessage, showModal, cancelModal } from 'components/redux/reducer/ModalReducer';

const initialState = {
    allCategories: {}
}
const categoryReducer = createSlice({
    name: "categoryReducer",
    initialState,
    reducers: {
        setAllCategories: (state, action) => {
            state.allCategories = action.payload
        }
    }
})

export const { 
    setAllCategories
} = categoryReducer.actions

export default categoryReducer.reducer
// ----------- HELPER ---------------------

// ----------- THUNK ----------------------

export const retrieveAllCategories = (data, navigate) => {
    return async dispatch => {
        try {
            console.log("retrieve all categories")
            await axiosInstance.get(`/category`).then((res) => {
                dispatch(setAllCategories(res.data))
            })
            .catch((err) => {
                console.log(err)
                navigate('/')
            });
        } catch (err) {
            console.log(err)
            navigate('/')
        }
    }
}

