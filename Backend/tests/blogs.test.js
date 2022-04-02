const mongoose = require('mongoose')
const supertest = require('supertest')
const { response, request } = require('../app')
const app = require('../app')

const api = supertest(app)

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
test('id not _id', async () => {
    const response= await api.get('/api/blogs')
    response.body.forEach(element => {
       
        expect(element.id).toBeDefined();  
    });
  });

test('post added',async () => {
    const resp= await api.get('/api/blogs')
    initial = resp.body.length
    let request  =  await api.post('/api/blogs')
   .send({
    "title": "S1",
    "author": "String",
    "url": "String",
    "likes": 3
  })
   .expect(201)

   expect({"title":request.body.title,"author":request.body.author,"url":request.body.url,"likes":request.body.likes}).toEqual({
    "title": "S1",
    "author": "String",
    "url": "String",
    "likes": 3
  })
  const respon= await api.get('/api/blogs')
  final = respon.body.length
  expect(final).toBe(initial+1)

}
)
test('likes default 0',async () => {
    
   let request  =  await api.post('/api/blogs')
   .send({
    "title": "S1",
    "author": "String",
    "url": "String",
    
  })
  expect(request.body.likes).toBe(0)
})
test('url and title necessary',async () => {
    
  let request  =  await api.post('/api/blogs')
  .send({
   "title": "lll",
   "author": "String",
   "url": "",
   
 })
 .expect(400)
})
test('post deleted',async () => {
  const resp= await api.get('/api/blogs')
  initial = resp.body.length
  let request  =  await api.delete('/api/blogs/delete/623306feeb00451b7514ea7f')
 expect(201)
const respon= await api.get('/api/blogs')
final = respon.body.length
expect(final).toBe(initial-1)

}
)
test('post updated',async () => {

  let request  =  await api.patch('/api/blogs/update/6232fcb7596da9a569b2897a')
  expect(201)
  console.log(request.body)
  expect(request.body.likes).toBe(14)
  

}
)
afterAll(() => {
    mongoose.connection.close()
  }) 