import React from 'react'
import Login from './components/Login'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from "react-router-dom"
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import BlogView from './components/BlogView'


const App = () => {
  return( 
    
    <Router>
      <Link to='/users'>users</Link>
      <Routes>
       
        <Route path="/users" element={<Users />} />
        <Route path="/" element={ <Login/>} />
        <Route path ='/users/:id' element = {<User/>}/>
        <Route path ='/blogs/:id' element = {<BlogView/>}/>
      </Routes>
     
    </Router>
  )
    
}

export default App