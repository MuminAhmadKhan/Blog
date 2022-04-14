import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initialBlogs } from '../Reducers/blogReducer'

import blogService from '../services/blogs'



const BlogForm = (props) => {
const {setBlogVisible,blogVisible}=props
    const [title,setTitle] = useState('')
  const [author,setAuthor] = useState('')
  const [url,setUrl] = useState('')
  const dispatch = useDispatch()
  const blogs = useSelector(state=>state.blog)
    const handleBlog = async (event)=>{
        event.preventDefault()
        console.log(blogs);
        try{ 
          
        console.log(await blogService.save('/api/blogs',{title,author,url}))
        }

        catch(error)
        {

        }
      
        try{
       dispatch(initialBlogs()) 
       }
        catch{  
        }
        setTitle('')
        setAuthor('')
        setUrl('')
        setBlogVisible(!blogVisible)
      }
  return (
    <div><form>
    <div className="mb-3">
      <label htmlFor="name" className="form-label">Name</label>
      <input type="text" id="name"className="form-control" value = {title} onChange={({target})=>setTitle(target.value)}/>
     </div>
    <div className="mb-3">
      <label htmlFor="author" className="form-label">Author</label>
      <input type="text" id="author" className="form-control" value = {author} onChange={({target})=>setAuthor(target.value)}/>
    </div>
    <div className="mb-3">
      <label htmlFor="url" className="form-label">Url</label>
      <input type="text" id="url" className="form-control" value = {url} onChange={({target})=>setUrl(target.value)}/>
    </div>
   
    <button  className="btn btn-primary " onClick={handleBlog}>Save</button>
  </form></div>
  )
}

export default BlogForm







