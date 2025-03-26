import { createSlice } from "@reduxjs/toolkit";
export const notificationTimeOut = (message, time = 3000) => {
    return async (dispatch) => {
      dispatch(setNotification(message))
      setTimeout(() => {
        dispatch(clearNotification())
      }, time);
    };
  };
  

const notificationSlice = createSlice({
  name: "notification",
  initialState: '',
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    clearNotification() {
      return ''
    }
  }
});

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
