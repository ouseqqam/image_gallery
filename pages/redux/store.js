
//create store for token
import { configureStore } from "@reduxjs/toolkit"
import tokenSlice from "./slice"

const store =  configureStore({
    reducer: {
        token: tokenSlice
    }
})

export default store;
