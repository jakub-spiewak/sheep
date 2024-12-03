import {createSlice} from "@reduxjs/toolkit";

type State = {
    year: number;
    month: number;
}

const today = new Date()

const initialState: State = {
    year: today.getFullYear(),
    month: today.getMonth() + 1
}

const slice = createSlice({
    name: 'currentMonthSlice',
    initialState,
    reducers: {
        increment: (state) => {
            state.month += 1;
            if (state.month > 12) {
                state.month = 1;
                state.year += 1;
            }
        },
        decrement: (state) => {
            state.month -= 1;
            if (state.month < 1) {
                state.month = 12;
                state.year -= 1;
            }
        }
    }
});

export const {increment, decrement} = slice.actions;

export default slice.reducer;