import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {

    const id = useParams().id
    const blogs = useSelector(state=>state.blog)
    console.log(blogs)
    console.log(typeof(blogs[0].user._id
    ),typeof(id))
    const userBlogs = blogs.filter(blog => blog.user._id === id)
    console.log(userBlogs)
  return (
    <div>
        <h2>{userBlogs[0].user.name}</h2>
        Added blogs
        <br/>
        <ul >
        {userBlogs.map(blog =>
            <li key ={blog.id}>{blog.title}</li>)}
        </ul>
    </div>
  )
}

export default User