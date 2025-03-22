import { createSlice } from '@reduxjs/toolkit'

const initialState  ="welcome to anecdote app"

const notificationSlice = createSlice({
    name: "notification",
    initialState ,
    reducers: {
        notify(state, action){
            return action.payload
        }
    }
})
export const {notify} = notificationSlice.actions
export default notificationSlice.reducer