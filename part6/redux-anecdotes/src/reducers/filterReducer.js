import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: "Filter",
  initialState: 'all',
 reducers:{
  setfilter(state , action){
    return  action.payload
     }
 }
})

export const  {setfilter} = filterSlice.actions
export default filterSlice.reducer