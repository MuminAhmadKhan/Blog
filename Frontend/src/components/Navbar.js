import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {login} from '../Reducers/userReducer'
import { initializeBlogs } from '../Reducers/blogReducer'
const Navbar = () => {
    const user = useSelector(state=>state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = async ()=>{
      console.log("loggedoyt")
      dispatch(login(""))
      
      dispatch(initializeBlogs([]))
      localStorage.removeItem('loggedinUser')
      navigate('/')


      //setUser('')
      
    } 
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light  " style={{"backgroundColor": "#e3f2fd"}}>
  <div className="container-fluid">
    <Link className="navbar-brand light" to="/">Blog-Store</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to="/">Blogs</Link>
        </li>{user.name?
        <>
        <li className="nav-item">
          <Link className="nav-link " to="/users">Users</Link>
        </li>
        <li>
        <button type="button" className="btn " onClick={handleLogout}>Logout</button>
        </li>
        </>:""}
      
       </ul>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar