import {React,useEffect, useState}from 'react'
import { Link } from 'react-router-dom'
import userServices from '../services/users'

const Users = () => {
    const [users,setUser] =useState([])
    useEffect(() => {
        const getUsers = async () => { setUser(await userServices.getAll())}
        getUsers()
    },[])
    console.log(users)
    
  return (
    <div>
        {users.map(user => 
        <div key = {user._id} >
            <p> <Link to = {`/users/${user._id}`} >{user.name}</Link> has written {user.blogs.length} blogs </p>
        </div>
        )}
    </div>
  )
}

export default Users