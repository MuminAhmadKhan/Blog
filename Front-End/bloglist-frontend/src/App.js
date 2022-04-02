import React, { useState, useEffect } from 'react'
import Alert from './components/Alert'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import  login  from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [name,setName] = useState('')
  const [password,setPassword] = useState('')
  const [user,setUser] = useState('')
  const [title,setTitle] = useState('')
  const [author,setAuthor] = useState('')
  const [url,setUrl] = useState('')
  const [alert,setAlert]=useState(null)
  const [blogVisible,setBlogVisible]=useState(false)
  const [error,setError]=useState(null)
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedinUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user.name)
      blogService.setHeader(user.token)
    }
  }, [])

  useEffect( () => {
    const fetch_data =async ()=> { setBlogs( await blogService.getAll())}
    fetch_data()
     
      
  }, [])
  const handleVisibility = ()=>{
    setBlogVisible(!blogVisible)
  }
  const handleLogin = async (event)=>{
    event.preventDefault()
    //console.log(name,password);
    const user = await login( `/api/login`,{ name , password })
    console.log(user)
    if(user.error){
      setError(true)
      setAlert({'type':'danger','msg':'Failed Login'})
      setTimeout(()=>setAlert(null),5000)
      
      return
    }
    setAlert({'type':'success','msg':'Login'})
    setUser(user.name)
    console.log("hi",user)
    window.localStorage.setItem('loggedinUser',JSON.stringify(user))
    blogService.setHeader(user.token)
    setName('')
    setPassword('')
    setTimeout(()=>setAlert(null),5000)
  }
  const handleLogout = async ()=>{
    localStorage.removeItem('loggedinUser')
    setUser('')
  } 
  
   return (
    <>
      { !user && <div className="container my-3">
        {error&& <Alert alert={alert}/>}
      <form>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id ="name" value = {name} onChange={({target})=>setName(target.value)}/>
   </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" value = {password} onChange={({target})=>setPassword(target.value)}/>
  </div>
 
  <button  className="btn btn-primary " id="Login" onClick={handleLogin}>Submit</button>
</form>
</div> }
{user && <div>
  <Alert alert={alert}/>
  <button type="button" className="btn btn-primary" onClick={handleLogout}>Logout</button>
  </div>}
     {user && <div>
       {blogVisible?<button type="button" className="btn btn-primary" onClick={handleVisibility}>Hide Form</button>:<button type="button" className="btn btn-primary" onClick={handleVisibility}>Show Form</button>}
      {blogVisible && <div className="container">
       <BlogForm setBlogs={setBlogs} setBlogVisible={setBlogVisible} blogs={blogs} blogVisible={blogVisible}/>
       </div>}
    <h4>{user}</h4>
     <h2>blogs</h2>
     </div>}
      {user && blogs.sort((a,b)=>b.likes-a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} blogs={blogs}setBlogs={setBlogs} user={user} />
      
      )}
    


    </>
  )
    
}

export default App