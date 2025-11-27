import supertest from 'supertest'
import app from '../src/app.js'

let id
let token

test('POST /users - Crear un usuario', async () => {
  const body = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@test.com',
    password: 'password123',
    genre: 'MALE'
  }

  const res = await supertest(app).post('/users').send(body)

  id = res.body.id

  expect(res.status).toBe(201)
  expect(res.body).toHaveProperty('id')
  expect(res.body.name).toBe(body.name)
  expect(res.body).not.toHaveProperty('password')
})

test('POST /users/login - Autenticar un usuario', async () => {
  const credentials = { email: 'johndoe@test.com', password: 'password123' }
  const res = await supertest(app).post('/users/login').send(credentials)
  token = res.body.token
  expect(res.status).toBe(200)
  expect(res.body).toHaveProperty('user')
  expect(res.body).toHaveProperty('token')
})

// Protected routes
test('GET /users - Obtener todos los usuarios', async () => {
  const res = await supertest(app).get('/users').set('Authorization', `Bearer ${token}`)
  expect(res.status).toBe(200)
  expect(res.body).toBeInstanceOf(Array)
})

test('PUT /users/:id - Actualizar el usuario', async () => {
  const body = {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'janedoe@test.com',
    password: 'password123',
    genre: 'FEMALE'
  }
  const res = await supertest(app).put(`/users/${id}`).send(body).set('Authorization', `Bearer ${token}`)
  expect(res.status).toBe(200)
  expect(res.body.name).toBe(body.name)
})

test('DELETE /users/:id - Eliminar usuario por ID', async () => {
  const res = await supertest(app).delete(`/users/${id}`)
  expect(res.status).toBe(204)
})