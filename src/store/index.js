import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user"
import bookReducer from "./book"

export default configureStore({
    reducer: {
        user: userReducer, // reducer для работы с пользователями
        book: bookReducer, // reducer для работы с книгами
    }
})