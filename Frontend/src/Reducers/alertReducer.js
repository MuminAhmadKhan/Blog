import {createSlice} from "@reduxjs/toolkit"

const alertSlice = createSlice({
    name:"alert",
    initialState:null,
    reducers:{
        createrAlert(state,actions){
            return actions.payload
        }
    }
})

export const {createrAlert} = alertSlice.actions
export default alertSlice.reducer