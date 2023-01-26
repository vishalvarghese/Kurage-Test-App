import {configureStore} from '@reduxjs/toolkit'
import userReducer from "./storeSlice"

export const store=  configureStore({
    reducer:{
        user:userReducer
    }
}) 