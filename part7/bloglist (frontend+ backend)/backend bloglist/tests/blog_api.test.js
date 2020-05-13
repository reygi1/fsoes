const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)





test('blogs returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blog post identifier is named id', async () => {
    const response = await api.get('/api/blogs')
    const blogsid = response.body.map(b => b.id)
    expect(blogsid).toBeDefined()    
  })

test('post create a new blog post', async () => {
    const newBlog =  { 
         title: "React patterns", 
         author: "Michael Chan", 
         url: "https://reactpatterns.com/", 
         likes: 7}

    const r = await api.get('/api/blogs') 
    const inL = r.body.map(b => b.id)
    const le = inL.length

    await api
    .post('/api/blogs')
    .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hcmlvOTkiLCJpZCI6IjVlYjA3MGNhNzNhNThmMTVjNGJjNWZhNSIsImlhdCI6MTU4ODYyNzA4NX0.M2rd6_-sD9uO-CJcpBnjWAItITn8tryKhLeSb_Q8JeM')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.title)

    expect(response.body).toHaveLength(le + 1)
    expect(contents).toContain(
        'React patterns'
    )
})

test('blog without likes, likes default is 0', async () => {
    const newBlog =  { 
        title: "React patterns", 
        author: "Michael Chan", 
        url: "https://reactpatterns.com/"}

 
  
    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hcmlvOTkiLCJpZCI6IjVlYjA3MGNhNzNhNThmMTVjNGJjNWZhNSIsImlhdCI6MTU4ODYyNzA4NX0.M2rd6_-sD9uO-CJcpBnjWAItITn8tryKhLeSb_Q8JeM')
      .send(newBlog)
  
      const r = await api.get('/api/blogs') 
      const inL = r.body.map(b => b.likes)
      expect(inL[inL.length - 1]).toEqual(0)
  })

test('blog title and url missing response 400 bad request', async () => {
    const newBlog =  { 
        author: "Michael Chan"}
  
    await api    
      .post('/api/blogs')
      .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hcmlvOTkiLCJpZCI6IjVlYjA3MGNhNzNhNThmMTVjNGJjNWZhNSIsImlhdCI6MTU4ODYyNzA4NX0.M2rd6_-sD9uO-CJcpBnjWAItITn8tryKhLeSb_Q8JeM')
      .send(newBlog)
      .expect(400)

})

test('adding a blog fails with proper status code 401 Unauthorized if token is not provided', async () => {
    const newBlog =  { 
        title: "React patterns", 
        author: "Michael Chan", 
        url: "https://reactpatterns.com/"}

    await api    
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

})



afterAll(() => {
  mongoose.connection.close()
})