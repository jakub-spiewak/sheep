import currentMonthSlice from "@/redux/slices/currentMonthSlice.ts";
import currentPageSlice from "@/redux/slices/currentPageSlice.ts";
import currentScheduleSlice from "@/redux/slices/currentScheduleSlice.ts";
import currentTagsSlice from "@/redux/slices/currentTagsSlice.ts";
import {api} from "./api.ts";
import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";

const reducer = combineReducers({
    [api.reducerPath]: api.reducer,
    currentPage: currentPageSlice,
    currentMonth: currentMonthSlice,
    currentSchedule: currentScheduleSlice,
    currentTags: currentTagsSlice,
})

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(api.middleware)
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

export const useGetCurrentMonth = () => {
    const {month, year} = useAppSelector(state => state.currentMonth);
    if (month >= 10) return `${year}-${month}`;
    return `${year}-0${month}`;
}
