import {combineReducers} from "redux";
import {api} from "./api.ts";
import {configureStore} from "@reduxjs/toolkit";

const reducer = combineReducers({
    [api.reducerPath]: api.reducer,
})

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(api.middleware)
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>