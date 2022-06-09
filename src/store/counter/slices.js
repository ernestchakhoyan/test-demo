import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 0,
}

const incrementAction = (state) => {
    state.value += 1;
};

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: incrementAction,
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
    }
})

// Action creators are generated for each case reducer function
export const { increment, decrement } = counterSlice.actions

export default counterSlice.reducer;
