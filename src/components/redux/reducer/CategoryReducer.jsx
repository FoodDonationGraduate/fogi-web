import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from "services/axios/axiosConfig.js";
import { setModalMessage, showModal, setModalType } from './ModalReducer';

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

export const retrieveAllCategories = (data, navigate) => {
    return async dispatch => {
        try {
            var currentData = {
                limit: data.limit,
                offset: data.offset,
                search_query: data.query,
                num_product_filter: data.num_product_filter,
                min_created_time: data.min_created_time,
                max_created_time: data.max_created_time,
                min_updated_time: data.min_updated_time,
                max_updated_time: data.max_updated_time,
                sorts: data.sorts
            }
            console.log("retrieve all categories")
            await axiosInstance.get(`/category`, { params: currentData })
            .then((res) => {
                dispatch(setAllCategories(res.data))
            })
            .catch((err) => {
                console.log(err)
                dispatch(setModalMessage(`Đã xảy ra lỗi!`))
                dispatch(setModalType('danger'))
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
            })
            .catch((err) => {
                console.log(err)
                dispatch(setModalMessage(`Đã xảy ra lỗi!`))
                dispatch(setModalType('danger'))
                dispatch(showModal())
            });
        } catch (err) {
            console.log(err)
            navigate('/')
        }
    }
}