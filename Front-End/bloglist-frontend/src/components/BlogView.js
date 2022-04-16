import { useState } from "react"
import React from 'react'
import blogService from '../services/blogs'
import  PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import { commentBlog, deleteBlog, likeBlog } from "../Reducers/blogReducer"
import { Link, useParams } from "react-router-dom"

const BlogView = () => {
    const id = useParams().id
    const blog = useSelector(state => state.blog.find(concernBlog=>concernBlog.id ===id))
    
    const like = useSelector(state => state.blog.find(concernBlog=>concernBlog.id === id).likes)
    const dispatch = useDispatch()
    const [comment,setComment] = useState('')
    const user = useSelector(state=>state.user)
    const handleLike = async ()=>{ 
      dispatch(likeBlog(blog))   
    }
    
    const handleDelete = async()=>{
       dispatch(deleteBlog(blog))
    }

    const handleComment = async(event)=>{
      event.preventDefault()
      dispatch(commentBlog(id,comment))
      
      setComment('')
    }
  return (
    <div>
        <div >
       <h3>{blog.title}</h3>
       <h5>{blog.author}</h5>
       <p className="url">{blog.url}</p>
       <p className = "like_no" >{like} </p>
       <ul>
       {blog.comments.map(comment=>
        <li>{comment}</li>)}
        </ul>
       <button type="button" className="btn btn-primary like" onClick={()=>handleLike()}>Like</button>
       <br></br>
       {blog.user.name === user.name ?<button type="button" className="btn btn-primary" onClick={()=>handleDelete()}>Remove</button>:""}
       <br></br>
       
     </div>
     
     <form>
    <div className="mb-3">
      <label htmlFor="comment" className="form-label">Comment</label>
      <input type="text" id="comment"className="form-control" value = {comment} onChange={({target})=>setComment(target.value)}/>
     </div>
 
   
    <button  className="btn btn-primary " onClick={handleComment}>Comment</button>
  </form>
  </div>
     
    
  )
}

export default BlogView