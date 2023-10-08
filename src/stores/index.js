import { configureStore } from "@reduxjs/toolkit";
import language from "./language";
import tokenBoolean from "./tokenBoolean";
import expDate from "./expDate";
const store = configureStore({
    reducer: {
        language,
        tokenBoolean,
        expDate
    }
})

export default store