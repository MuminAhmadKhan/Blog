import { createSlice } from "@reduxjs/toolkit";
import userServices from "../services/users";

const userSlice = createSlice({
    name:'users',
    initialState:[],
    reducers:{
        getUsers(state,actions){
            
            return actions.payload

        }
    }
})
export const allUsers = () =>{ 
    return async dispatch => {
      const all_users = await userServices.getAll()
      dispatch(getUsers(all_users))
    }
  }
export const {getUsers} = userSlice.actions
export default userSlice.reducer