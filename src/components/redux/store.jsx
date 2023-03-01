import { configureStore, combineReducers } from '@reduxjs/toolkit'
import authenticationReducer from './reducer/AuthenticationReducer.jsx'
import modalReducer from './reducer/ModalReducer.jsx'
const store = configureStore({
    reducer: {
        authenticationReducer,
        modalReducer
    },
})
export default store