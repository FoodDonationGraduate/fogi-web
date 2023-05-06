import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from "services/axios/axiosConfig.js";
import { handleExpiredToken } from './AuthenticationReducer';
import { setModalMessage, showModal } from './ModalReducer';

const initialState = {
    allCategories: {},
    currentCategory: {}
}
const categoryReducer = createSlice({
    name: "categoryReducer",
    initialState,
    reducers: {
        setAllCategories: (state, action) => {
            state.allCategories = action.payload
        },
        setCurrentCategory : (state, action) => {
            state.currentCategory = action.payload
        }
    }
})

export const { 
    setAllCategories, setCurrentCategory
} = categoryReducer.actions

export default categoryReducer.reducer
// ----------- HELPER ---------------------

// ----------- THUNK ----------------------

export const retrieveAllCategories = (navigate) => {
    return async dispatch => {
        try {
            console.log("retrieve all categories")
            await axiosInstance.get(`/category`).then((res) => {
                dispatch(setAllCategories(res.data))
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

export const retrieveCategory = (data, navigate) => {
    return async dispatch => {
        try {
            console.log("retrieve category by id: " + data.id)
            await axiosInstance.get(`/category`, {params: {
                id: data.id,
            }}).then((res) => {
                dispatch(setCurrentCategory(res.data))
                return res.data;
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