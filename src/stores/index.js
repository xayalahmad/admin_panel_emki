import { configureStore } from "@reduxjs/toolkit";
import language from "./language";
import tokenBoolean from "./tokenBoolean";
const store = configureStore({
    reducer: {
        language,
        tokenBoolean
    }
})

export default store