const dummy = (blogs) => {
  return 1
  }
const totalLikes = (blogs)=>{
    return blogs.reduce((likes,blog)=>{
        return  likes+blog.likes

    },0)
}

const favouriteBlog = (blogs)=>{
  return blogs.reduce((most,blog)=>{
   return blog.likes>most.likes?blog:most
  },{"likes":0})
}
  
  module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
  }