import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'



const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        modalState: false,
        modalType: "dropIn"
    },
    reducers: {
        setModalState: (state, { payload }) => {
            state.modalState = payload
        },
        setModalType: (state, { payload }) => {
            state.modalType = payload
        },
    },
})


export const { setModalState, setModalType } = modalSlice.actions
export default modalSlice.reducer