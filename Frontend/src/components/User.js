import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
const User = () => {

    const id = useParams().id
    const blogs = useSelector(state=>state.blog)
    console.log(blogs)
   
    const users = useSelector(state=>state.users)
    const user = users.find(user=>user._id === id)
    const userBlogs = blogs.filter(blog => blog.user._id === id)
    if (!(user && userBlogs)){
        return null
    }
  return (
    <div>
        <h2>{user.name}</h2>
        Added blogs {userBlogs.length}
        <br/>
        <ul >
        {userBlogs.map(blog =>
            <li key ={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></li>)}
        </ul>
    </div>
  )
}

export default User