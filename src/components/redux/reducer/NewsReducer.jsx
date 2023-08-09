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
                is_headline: data.is_headline,
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

export const createNews = (data, director, navigate) => {
    return async dispatch => {
        try {
            var currentData = {
                email: director.userInfo.email,
                token: director.userToken,
                title: data.title,
                content: data.content,
                url: data.url,
                image: data.image,
                is_headline: data.is_headline
            }

            console.log('Create news');
            axiosInstance.post(`/news`, currentData)
            .then((res) => {
                dispatch(retrieveAllNews(data.filterData ? data.filterData : {}, navigate));
        
                dispatch(setModalMessage("Thêm Tin tức thành công!"));
                dispatch(showModal());
            })
            .catch((err) => {
                if (handleExpiredToken(err.response.data, dispatch, navigate)) {

                } else {
                    console.log(err.response.data);
                    dispatch(setModalMessage("Thêm Tin tức không thành công!"))
                    dispatch(setModalType('danger'))
                    dispatch(showModal())
                }
            });
        } catch (err) {
            console.log(err);
            navigate('/');
        }
    }
}

export const updateNews = (data, director, navigate) => {
    return async dispatch => {
        try {
            var currentData = {
                email: director.userInfo.email,
                token: director.userToken,
                id: data.id,
                is_headline: data.is_headline,
                title: data.title,
                content: data.content,
                url: data.url,
                is_headline: data.is_headline
            }
            if (data.image) currentData.image = data.image;

            console.log('Update news');
            axiosInstance.patch(`/news`, currentData)
            .then((res) => {
                dispatch(retrieveAllNews(data.filterData ? data.filterData : {}, navigate));
        
                dispatch(setModalMessage("Cập nhật Tin tức thành công!"));
                dispatch(showModal());
            })
            .catch((err) => {
                if (handleExpiredToken(err.response.data, dispatch, navigate)) {

                } else {
                    console.log(err.response.data);
                    dispatch(setModalMessage("Cập nhật Tin tức không thành công!"))
                    dispatch(setModalType('danger'))
                    dispatch(showModal())
                }
            });
        } catch (err) {
            console.log(err);
            navigate('/');
        }
    }
}

export const deleteNews = (data, user, navigate) => {
    return async dispatch => {
        try {
            console.log('Delete news');
            await axiosInstance.delete(`/news`, {params: {
                id: data.id,
                email: user.userInfo.email,
                token: user.userToken
            }}).then((res) => {
                dispatch(retrieveAllNews(data.filterData ? data.filterData : {}, navigate));
                dispatch(setModalMessage(`Xóa thành công!`));
                dispatch(showModal());
            })
            .catch((err) => {
                if (handleExpiredToken(err.response.data, dispatch, navigate)) {}
                else {
                    console.log(err)
                    dispatch(setModalMessage(`Đã xảy ra lỗi!`))
                    dispatch(setModalType('danger'))
                    dispatch(showModal())
                }
            });
        } catch (err) {
            console.log(err)
            navigate('/')
        }
    }
}