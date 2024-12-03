import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type State = {
    tags?: string[],
    anyOfTags: boolean,
}

const initialState: State = {
    tags: undefined,
    anyOfTags: true,
}

const slice = createSlice({
    name: 'currentScheduleSlice',
    initialState,
    reducers: {
        setCurrentTags: (state, action: PayloadAction<string[] | undefined>) => {
            if (action.payload && action.payload.length > 0) {
                state.tags = action.payload;
            } else {
                state.tags = undefined;
            }
        },
        setAnyOfTags: (state, action: PayloadAction<boolean>) => {
            state.anyOfTags = action.payload;
        }
    }
});

export const {setCurrentTags, setAnyOfTags} = slice.actions;

export default slice.reducer;