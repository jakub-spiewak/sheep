import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type State = {
    schedule?: string,
    sort?: {
        field: string,
        order: 'asc' | 'desc'
    }
}

const initialState: State = {
    schedule: undefined,
    sort: {
        field: 'name',
        order: 'asc'
    }
}

const slice = createSlice({
    name: 'currentScheduleSlice',
    initialState,
    reducers: {
        setCurrentSchedule: (state, action: PayloadAction<string | undefined>) => {
            state.schedule = action.payload;
        },
        setSort: (state, action: PayloadAction<string>) => {
            if (action.payload === state.sort?.field) {
                if (state.sort.order === 'asc') {
                    state.sort.order = 'desc';
                } else {
                    state.sort = undefined;
                }
            } else {
                state.sort = {
                    field: action.payload,
                    order: 'asc'
                };
            }
        }
    }
});

export const {setCurrentSchedule, setSort} = slice.actions;

export default slice.reducer;