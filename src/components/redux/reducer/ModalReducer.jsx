import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    message: '',
    question: '',
    visibility: false,
    type: 'default',
    questionModalVisibility: false,
    logic: false
}

const modalReducer = createSlice({
    name: "modalReducer",
    initialState,
    reducers: {
        setModalMessage: (state, action) => {
            state.message = action.payload;
        },
        showModal: (state, action) => {
            state.visibility = true;
        },
        hideModal: (state, action) => {
            state.visibility = false;
            state.type = 'default';
        },

        setModalQuestion: (state,action) => {
            state.question = action.payload;
        },
        setModalType: (state, action) => {
            state.type = action.payload;
        },
        showQuestionModal: (state, action) => {
            state.questionModalVisibility = true;
        },
        hideQuestionModal: (state, action) => {
            state.questionModalVisibility = false;
        },
        cancelQuestionModal: (state, action) => {
            state.logic = false;
        },
        confirmQuestionModal: (state, action) => {
            state.logic = true;
        }
    }
})

export const { 
    setModalMessage, showModal, hideModal, 
    setModalType, setModalQuestion, showQuestionModal, hideQuestionModal, confirmQuestionModal, cancelQuestionModal
} = modalReducer.actions

export default modalReducer.reducer
// ----------- HELPER ---------------------


// ----------- THUNK ----------------------
