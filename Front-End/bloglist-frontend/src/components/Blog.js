import { useState } from "react"
import React from 'react'
import blogService from '../services/blogs'
import  PropTypes from "prop-types"
const Blog = ({blog,blogs,setBlogs,user}) =>
{
 //console.log(blog.user.name,,user)
  const [disp,setDisp]=useState('basic')
  const [like,setLike]=useState(blog.likes)
  const handleLike = async ()=>{
    const response = await blogService.like(`/api/blogs/update/${blog.id}`)
    setLike(like+1)
    blog.likes+=1

    setBlogs([...blogs])
  }
  const handleDelete = async()=>{
    const response = await blogService.delete_(`/api/blogs/delete/${blog.id}`)
    setBlogs(blogs.filter((ablog)=>ablog.id!==blog.id))
  }
 return (
  <div className="blog">
    { disp ==='basic' ?
    <div>
     <h3 className="title">{blog.title}</h3>
     <h5>{blog.author}</h5>
     <button type="button" className="btn btn-primary" onClick={()=>setDisp('full')}>Expand</button></div>
     :
     <div>
       <h3>{blog.title}</h3>
       <h5>{blog.author}</h5>
       <p className="url">{blog.url}</p>
       <p class = "like_no" >{like} </p>
       <button type="button" className="btn btn-primary like" onClick={()=>handleLike()}>Like</button>
       <br></br>
       {blog.user.name === user ?<button type="button" className="btn btn-primary" onClick={()=>handleDelete()}>Remove</button>:""}
       <br></br>
       <button type="button" className="btn btn-primary" onClick={()=>setDisp('basic')}>Hide</button>
     </div>}
  </div>  
)
 }
Blog.propTypes = {
  blog : PropTypes.object.isRequired,
  blogs :PropTypes.array.isRequired,
  setBlogs : PropTypes.func.isRequired
}
export default Blog