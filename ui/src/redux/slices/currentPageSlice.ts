import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type State = {
    page: 'expense-entry'
} | {
    page: string
}

const initialState: State = {
    page: 'expense-entry'
}

const slice = createSlice({
    name: 'currentPageSlice',
    initialState,
    reducers: {
        setCurrentPage: (state, action: PayloadAction<string>) => {
            state.page = action.payload;
        }
    }
});

export const {setCurrentPage} = slice.actions;

export default slice.reducer;