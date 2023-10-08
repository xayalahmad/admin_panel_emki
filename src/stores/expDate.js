import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    expDate: ''
}

const expDate = createSlice({
    name: 'expDateStore',
    initialState,
    reducers: {
        setExpDate: (state, action) => {
            state.expDate = action.payload
        }
    }
})

export const { setExpDate } = expDate.actions
export default expDate.reducer