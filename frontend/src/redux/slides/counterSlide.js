import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 0,
}

export const counterSlide = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        incrememnt: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
    },
})

//Action creators are generated for each case reducer function
export const { incrememnt, decrement, incrementByAmount } = counterSlide.actions

export default counterSlide.reducer