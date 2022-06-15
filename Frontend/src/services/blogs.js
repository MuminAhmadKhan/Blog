import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async() => {
  const request = await axios.get(baseUrl)
  return request.data
}
let header = null
const setHeader = (token) => {
  console.log(token)
   header = `Bearer ${token}`
}

async function save(saveUrl = `/api/blogs`, data = {}) {
    
  const response = await fetch( `http://localhost:3001${saveUrl}` , {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    
    headers: new Headers({
      'Content-Type': 'application/json',
       'Authorization':header
      
    }),
    
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
async function like(likeUrl = `/api/blogs/like`, data = {}) {
    
  const response = await fetch( `http://localhost:3001${likeUrl}` , {
    method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
    
    headers: new Headers({
      'Content-Type': 'application/json',
       'Authorization':header
      
    }),
    
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
async function delete_(deleteUrl = `/api/blogs/delete`, data = {}) {
    
  const response = await fetch( `http://localhost:3001${deleteUrl}` , {
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    
    headers: new Headers({
      'Content-Type': 'application/json',
       'Authorization':header
      
    }),
    
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
async function comment(commentUrl = `/api/blogs/comment`, data = {}) {    
  const response = await fetch( `http://localhost:3001${commentUrl}` , {
    method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
    
    headers: new Headers({
      'Content-Type': 'application/json',
       'Authorization':header
      
    }),
    
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}



export default { getAll  , setHeader , save , like , delete_,comment}