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
test('GET /hotels - Obtener todas los hoteles', async () => {
  const res = await supertest(app).get('/hotels')
  expect(res.status).toBe(200)
  expect(res.body).toBeInstanceOf(Array)
})

// POST privado → Crear una ciudad
test('POST /hotels - Crear un hotel', async () => {
  const body = { 
    name: 'hotel clinton', 
    description: 'hotel prestijioso de bogota', 
    price: 40000,
    address: 'av 26 - cra 13' ,
    lat: 4.6558,
    lon: 74.05541,
    cityId:6
  }
  const res = await supertest(app)
    .post('/hotels')
    .send(body)
    .set('Authorization', `Bearer ${token}`)

  id = res.body.id

  expect(res.status).toBe(201)
  expect(res.body).toHaveProperty('id')
  expect(res.body.name).toBe(body.name)
  expect(res.body.country).toBe(body.country)
  expect(res.body.countryId).toBe(body.countryId)
})

// PUT privado → Actualizar hotel
test('PUT /hotels/:id - Actualizar el hotel', async () => {
  const body = { 
    name: 'hotel clinton', 
    description: 'hotel prestijioso de bogota', 
    price: 40000,
    address: 'av 26 - cra 13' ,
    lat: 4.6558,
    lon: 74.05541,
    cityId:6
  }
  const res = await supertest(app)
    .put(`/hotels/${id}`)
    .send(body)
    .set('Authorization', `Bearer ${token}`)

  expect(res.status).toBe(200)
  expect(res.body.name).toBe(body.name)
  expect(res.body.description).toBe(body.description)
  expect(res.body.price).toBe(body.price)
  expect(res.body.address).toBe(body.address)
  expect(res.body.lat).toBe(body.lat)
  expect(res.body.lon).toBe(body.lon)
  expect(res.body.cityId).toBe(body.cityId)
})

// DELETE privado → Eliminar ciudad
test('DELETE /hotels/:id - Eliminar hotel por ID', async () => {
  const res = await supertest(app)
    .delete(`/hotels/${id}`)
    .set('Authorization', `Bearer ${token}`)

  expect(res.status).toBe(204)
})
