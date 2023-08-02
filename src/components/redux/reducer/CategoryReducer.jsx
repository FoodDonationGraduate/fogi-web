import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from "services/axios/axiosConfig.js";
import { setModalMessage, showModal, setModalType } from './ModalReducer';
import { handleExpiredToken } from './AuthenticationReducer';
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
                limit: data.limit ? data.limit : 16,
                offset: data.offset ? data.offset : 0,
                search_query: data.query,
                num_product_filter: data.num_product_filter,
                min_created_time: data.min_created_time,
                max_created_time: data.max_created_time,
                min_updated_time: data.min_updated_time,
                max_updated_time: data.max_updated_time,
                sorts: data.sorts
            }
            console.log("retrieve all categories")
            if (data.setIsLoading) data.setIsLoading(true);

            await axiosInstance.get(`/category`, { params: currentData })
            .then((res) => {
                dispatch(setAllCategories(res.data))
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

export const deleteCategory = (data, user, navigate) => {
    return async dispatch => {
        try {
            console.log("delete category id: " + data.id)
            await axiosInstance.delete(`/category`, {params: {
                id: data.id,
                email: user.userInfo.email,
                token: user.userToken
            }}).then((res) => {
                dispatch(retrieveAllCategories(data.filterData ? data.filterData : {}, navigate));
                dispatch(setModalMessage(`Xóa thành công!`))
                dispatch(showModal())
                dispatch(retrieveAllCategories({}, navigate))
            })
            .catch((err) => {
                if (handleExpiredToken(err.response.data, dispatch, navigate)) {}
                else if (err.response.data.exit_code === 801) {
                    dispatch(setModalMessage(`Không thể xóa hạng mục này!`))
                    dispatch(setModalType('danger'))
                    dispatch(showModal())
                }
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

export const updateCategory = (data, user, navigate) => {
    return async dispatch => {
        try {
            console.log("update category id: " + data.id);
            var currentData = {
                id: data.id,
                email: user.userInfo.email,
                token: user.userToken,
                name: data.name,
                description: data.description,
                image: data.image
            };
            if (data.image) {currentData.image = data.image}
            await axiosInstance.patch(`/category`, currentData).then((res) => {
                dispatch(retrieveAllCategories(data.filterData ? data.filterData : {}, navigate));
                dispatch(setModalMessage(`Cập nhật thành công!`))
                dispatch(showModal())
                dispatch(retrieveAllCategories({}, navigate))
            })
            .catch((err) => {
                if (handleExpiredToken(err.response.data, dispatch, navigate)) {}
                else if (err.response.data.exit_code === 800) {
                    dispatch(setModalMessage(`Không tìm thấy hạng mục này!`))
                    dispatch(setModalType('danger'))
                    dispatch(showModal())
                }
                else if (err.response.data.exit_code === 300) {
                    dispatch(setModalMessage(`Tên hạng mục đã tồn tại!`))
                    dispatch(setModalType('danger'))
                    dispatch(showModal())
                }
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