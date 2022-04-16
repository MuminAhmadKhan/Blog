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
        },
        commentB(state,actions){
            const blog = state.find(cBlog=>cBlog.id===actions.payload.id)
            blog.comments.push(actions.payload.comment)
            return state
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
      await blogServices.like(`/api/blogs/like/${blog.id}`)
      dispatch(setLikes(blog))
    }
  }
export const deleteBlog = (blog) =>{ 
    return async dispatch => {
        await blogServices.delete_(`/api/blogs/delete/${blog.id}`)
        dispatch(removeBlog(blog))
    }
  }
export const commentBlog = (id,comment) =>{ 
    return async dispatch => {
        await blogServices.comment(`/api/blogs/comment/${id}`,{comment})
        dispatch(commentB({id,comment}))
    }
  }

  export const {initializeBlogs,setLikes,removeBlog,commentB} = blogSlice.actions
  export default blogSlice.reducer