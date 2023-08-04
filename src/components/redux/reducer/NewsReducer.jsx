import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from "services/axios/axiosConfig.js";
import { setModalMessage, showModal, setModalType } from './ModalReducer';
import { handleExpiredToken } from './AuthenticationReducer';
const initialState = {
    allNews: {}
}
const newsReducer = createSlice({
    name: "newsReducer",
    initialState,
    reducers: {
        setAllNews: (state, action) => {
            state.allNews = action.payload
        }
    }
})

export const { 
    setAllNews
} = newsReducer.actions

export default newsReducer.reducer
// ----------- HELPER ---------------------

// ----------- THUNK ----------------------

export const retrieveAllNews = (data, navigate) => {
    return async dispatch => {
        try {
            var currentData = {
                limit: data.limit ? data.limit : 20,
                offset: data.offset ? data.offset : 0,
                search_query: data.query,
                min_created_time: data.min_created_time,
                max_created_time: data.max_created_time,
                min_updated_time: data.min_updated_time,
                max_updated_time: data.max_updated_time,
                sorts: data.sorts
            }
            console.log("retrieve all news")
            if (data.setIsLoading) data.setIsLoading(true);

            await axiosInstance.get(`/news`, { params: currentData })
            .then((res) => {
                dispatch(setAllNews(res.data))
                if (data.setIsLoading) data.setIsLoading(false);
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