import supertest from 'supertest'
import app from '../src/app.js'

let id
let token

beforeAll(async () => {
  const credentials = { email: 'jhon@example.com', password: 'pass1234' }
  const res = await supertest(app).post('/users/login').send(credentials)
  token = res.body.token
})

// GET público → Obtener todas las ciudades
test('GET /cities - Obtener todas las ciudades', async () => {
  const res = await supertest(app).get('/cities')
  expect(res.status).toBe(200)
  expect(res.body).toBeInstanceOf(Array)
})

// POST privado → Crear una ciudad
test('POST /cities - Crear una ciudad', async () => {
  const body = { 
    name: 'cali', 
    country: 'Colombia', 
    countryId: 'COL' 
  }
  const res = await supertest(app)
    .post('/cities')
    .send(body)
    .set('Authorization', `Bearer ${token}`)

  id = res.body.id

  expect(res.status).toBe(201)
  expect(res.body).toHaveProperty('id')
  expect(res.body.name).toBe(body.name)
  expect(res.body.country).toBe(body.country)
  expect(res.body.countryId).toBe(body.countryId)
})

// PUT privado → Actualizar ciudad
test('PUT /cities/:id - Actualizar la ciudad', async () => {
  const body = { 
    name: 'Nature',
    country: 'Colombia',
    countryId: 'CO'
  }
  const res = await supertest(app)
    .put(`/cities/${id}`)
    .send(body)
    .set('Authorization', `Bearer ${token}`)

  expect(res.status).toBe(200)
  expect(res.body.name).toBe(body.name)
  expect(res.body.country).toBe(body.country)
  expect(res.body.countryId).toBe(body.countryId)
})

// DELETE privado → Eliminar ciudad
test('DELETE /cities/:id - Eliminar ciudad por ID', async () => {
  const res = await supertest(app)
    .delete(`/cities/${id}`)
    .set('Authorization', `Bearer ${token}`)

  expect(res.status).toBe(204)
})
