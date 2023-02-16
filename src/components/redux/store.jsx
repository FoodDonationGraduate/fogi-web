import { configureStore } from '@reduxjs/toolkit'
import authenticationReducer from './reducer/AuthenticationReducer.jsx'
const store = configureStore({
    reducer: {
        authenticationReducer
    },
})
export default store