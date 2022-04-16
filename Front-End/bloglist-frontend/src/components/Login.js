import {React,useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Alert from '../components/Alert'
import Blog from '../components/Blog'
import BlogForm from '../components/BlogForm'
import { createrAlert } from '../Reducers/alertReducer'
import { initialBlogs } from '../Reducers/blogReducer'
import { login, signIn } from '../Reducers/userReducer'
import blogService from '../services/blogs'
const Login = () => {
    const [name,setName] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError]=useState(null)
    const [blogVisible,setBlogVisible]=useState(false)
    const dispatch =  useDispatch()
    const user = useSelector(state=>state.user)
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedinUser')
        console.log(loggedUserJSON)
        if (loggedUserJSON) {
          const loggedUser = JSON.parse(loggedUserJSON)
          dispatch(login(loggedUser))
          
          //setUser(user.name)
         // console.log(loggedUser,user)
          blogService.setHeader(user.token)
        }
      }, [])
    
      useEffect( () => {
    
        const initialize = async () =>  dispatch(initialBlogs())
        if (user.name)
        initialize()
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
        setUser()
      }, [user] )
      
      const setUser = ()=>{
        
        if(user.error){
          setError(true)
          //setAlert({'type':'danger','msg':'Failed Login'})
          
          dispatch(createrAlert({'type':'danger','msg':'Failed Login'}))
          setTimeout(()=>dispatch(createrAlert(null)),5000)
          return
          
        }
        else if (user.name){
        dispatch(createrAlert({'type':'success','msg':'Login'}))
        //setUser(user.name)
        //console.log("hi",user)
        window.localStorage.setItem('loggedinUser',JSON.stringify(user))
        const loggedUserJSON = window.localStorage.getItem('loggedinUser')
        console.log(loggedUserJSON)
        blogService.setHeader(user.token)
        setName('')
        setPassword('')
        setTimeout(()=>dispatch(createrAlert(null)),5000)
      }}
      const handleLogout = async ()=>{
        localStorage.removeItem('loggedinUser')
        //setUser('')
        dispatch(login(''))
      } 
      const handleVisibility = ()=>{
        setBlogVisible(!blogVisible)
      }

  return (
    <div>
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
 
  <button  className="btn btn-primary " id="Login" onClick={handleLogin}>Submit</button>
</form>
</div> }
{ user.name && <div>
  <Alert />
  <button type="button" className="btn btn-primary" onClick={handleLogout}>Logout</button>
  </div>}
  {user.name &&   <div>
       {blogVisible?<button type="button" className="btn btn-primary" onClick={handleVisibility}>Hide Form</button>:<button type="button" className="btn btn-primary" onClick={handleVisibility}>Show Form</button>}
      {blogVisible && <div className="container">
       <BlogForm  setBlogVisible={setBlogVisible}  blogVisible={blogVisible}/>
     </div>}
    <h4>{user.name}</h4>
     <h2>blogs</h2>
     </div>}
      
     {user && blogs.map(blog_ =>
        <Blog key={blog_.id} blog={blog_}   />
      
      )}
    </div>
  )
}

export default Login