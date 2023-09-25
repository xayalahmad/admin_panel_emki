import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tokenBoolean: true
}

const tokenBoolean = createSlice({
    name: 'tokenBooleanStore',
    initialState,
    reducers: {
        setTokenBoolean: (state, action) => {
            state.tokenBoolean = action.payload
        }
    }
})

export const { setTokenBoolean } = tokenBoolean.actions
export default tokenBoolean.reducer