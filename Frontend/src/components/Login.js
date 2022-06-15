import {React,useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Alert from '../components/Alert'
import Blog from '../components/Blog'
import BlogForm from '../components/BlogForm'
import { createrAlert } from '../Reducers/alertReducer'
import { initialBlogs, initializeBlogs } from '../Reducers/blogReducer'
import { login, signIn } from '../Reducers/userReducer'
import blogService from '../services/blogs'
import { Link } from 'react-router-dom'
const Login = () => {
    const [name,setName] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError]=useState(null)
    const [blogVisible,setBlogVisible]=useState(false)
    const dispatch =  useDispatch()
    const user = useSelector(state=>state.user)
    console.log(user.name)
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedinUser')
       
        if (loggedUserJSON) {
          console.log(loggedUserJSON)
          const loggedUser = JSON.parse(loggedUserJSON)
          dispatch(login(loggedUser))
          
          //setUser(user.name)
         // console.log(loggedUser,user)
          blogService.setHeader(user.token)
        }
      }, [])
    
      useEffect( () => {
    
        const initialize = async () =>  dispatch(initialBlogs())
        if (user.name){
          console.log(user.name)
          initialize()}
      }, [user])
      const blogs = useSelector(state=>state.blog)
      console.log(blogs)
    const handleLogin = async (event)=>{
    
        event.preventDefault()
        //console.log(name,password);
        //const user = await login( `/api/login`,{ name , password })
        dispatch(signIn(name,password))
      }
      useEffect(() => {
        if(user.error){
          setError(true)
         
          dispatch(createrAlert({'type':'danger','msg':'Failed Login'}))
          setTimeout(()=>dispatch(createrAlert(null)),5000)
          return
          
        }
        else 
          setUser()
      }, [user] )
      
      const setUser = ()=>{
        
        const loggedUserJSON = window.localStorage.getItem('loggedinUser')
        console.log(loggedUserJSON)
        if (!loggedUserJSON && user.name){
        dispatch(createrAlert({'type':'success','msg':'Login'}))
       
        window.localStorage.setItem('loggedinUser',JSON.stringify(user))
       
        blogService.setHeader(user.token)
        setName('')
        setPassword('')
        setTimeout(()=>dispatch(createrAlert(null)),5000)
      }}
      const handleLogout = async ()=>{
        dispatch(login(""))
        dispatch(initializeBlogs([]))
        
        localStorage.removeItem('loggedinUser')
        //setUser('')
       
      } 
      const handleVisibility = ()=>{
        setBlogVisible(!blogVisible)
      }

  return (
    <div className='container'>
         { !user.name && <div className="container my-3">
        {error && <Alert />}
      <form>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id ="name" value = {name} onChange={({target})=>setName(target.value)}/>
   </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" value = {password} onChange={({target})=>setPassword(target.value)}/>
  </div>
 
  <button  className="btn btn-info "style={{"backgroundColor": "#e3f2fd"}} id="Login" onClick={handleLogin}>Login</button>
</form>
</div> }
{ user.name && <div>
  <Alert />
  
  </div>}
  {user.name &&   <div>
       {blogVisible?<button type="button" className="btn btn-primary  " style={{"backgroundColor": "#6296e2"}} onClick={handleVisibility}>Hide Form</button>:<button type="button" className="btn btn-primary mt-2" style={{"backgroundColor": "#7c97e5"}} onClick={handleVisibility}>Show Form</button>}
      {blogVisible && <div className="container">
       <BlogForm  setBlogVisible={setBlogVisible}  blogVisible={blogVisible}/>
     </div>}
    <h1 className='text-muted'>{user.name}</h1>
     <h2 className='text-info'>Blogs Added </h2>
     </div>}
     <ol className="list-group list-group-numbered">
     {user && 
        blogs.map(blog =>
           
            <li className="list-group-item d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold"><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></div>
                Written by {blog.author}
              </div>
              <span className="badge bg-primary rounded-pill">{blog.likes}</span>
            </li> 
        ) 
      
      }
      </ol>
    </div>
  )
}

export default Login