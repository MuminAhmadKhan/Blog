import { createSlice } from "@reduxjs/toolkit"
import blogServices from '../services/blogs'

const blogSlice = createSlice({
    name:'blog',
    initialState:[],
    reducers:{
        initializeBlogs(state,actions){
            return actions.payload.sort((a,b)=>b.likes-a.likes)
        },
        setLikes(state,actions){
            state = state.filter(blog=>blog.id!==actions.payload.id)
            state.push({...actions.payload,likes:actions.payload.likes+1})
            return state.sort((a,b)=>b.likes-a.likes)
        },
        removeBlog(state,actions){
            return state.filter(blog=>blog.id!==actions.payload.id)
        }
    }
})

export const initialBlogs = () =>{ 
    return async dispatch => {
      const blogs = await blogServices.getAll()
      dispatch(initializeBlogs(blogs))
    }
  }
export const likeBlog = (blog) =>{ 
    return async dispatch => {
      await blogServices.like(`/api/blogs/update/${blog.id}`)
      dispatch(setLikes(blog))
    }
  }
export const deleteBlog = (blog) =>{ 
    return async dispatch => {
        await blogServices.delete_(`/api/blogs/delete/${blog.id}`)
        dispatch(removeBlog(blog))
    }
  }

  export const {initializeBlogs,setLikes,removeBlog} = blogSlice.actions
  export default blogSlice.reducer