import { createSlice } from "@reduxjs/toolkit";
import loginServices from "../services/login"

const userSlice = createSlice({
    name:'user',
    initialState:'',
    reducers:{
        login(state,actions){
            
            return actions.payload

        }
    }
})

export const signIn = (name,password) =>{ 
    return async dispatch => {
      const user = await loginServices(`/api/login`,{ name , password })
      dispatch(login(user))
    }
  }
export const {login} = userSlice.actions
export default userSlice.reducer