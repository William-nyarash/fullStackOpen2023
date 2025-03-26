import { configureStore } from "@reduxjs/toolkit"
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from "./reducers/noticicationReducer"

const store = configureStore({
    reducer: {
        filter: filterReducer,
        notification:notificationReducer,
        anecdotes: anecdoteReducer
    }
})

export default store