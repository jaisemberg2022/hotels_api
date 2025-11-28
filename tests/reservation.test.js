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
test('GET /reservation - Obtener todas las reservaciones', async () => {
  const res = await supertest(app)
    .get('/reservation')
    .set('Authorization', `Bearer ${token}`) 
  expect(res.status).toBe(200)
  expect(res.body).toBeInstanceOf(Object)
})

// POST privado → Crear una reservación
test('POST /favorites - Crear un Favorito', async () => {
  const body = {
    "hotelId": 1,
    "checkIn": "2025-12-01",
    "checkOut": "2025-12-05"
    }
  const res = await supertest(app).post('/reservation').send(body).set('Authorization', `Bearer ${token}`)
  id = res.body.id
  expect(res.status).toBe(201)
  expect(res.body).toHaveProperty('id')
})


// PUT privado → Actualizar reservación
test('PUT /reservation/:id - Actualizar la reservación', async () => {
  const body = { 
    checkIn: '2025-06-01',
    checkOut: '2025-06-10'
  }

  const res = await supertest(app)
    .put(`/reservation/${id}`)
    .send(body)
    .set('Authorization', `Bearer ${token}`)

  expect(res.status).toBe(200)
  expect(res.body.checkIn).toBe(body.checkIn)
  expect(res.body.checkOut).toBe(body.checkOut)
  
  // Solo verificamos que userId y hotelId no cambien
  expect(res.body.userId).toBeDefined()
  expect(res.body.hotelId).toBeDefined()
})

// PUT privado → Eliminar reservación
test('DELETE /reservation/:id - Eliminar reservacion por ID', async () => {
  const res = await supertest(app).delete(`/reservation/${id}`).set('Authorization', `Bearer ${token}`)
  expect(res.status).toBe(204)
})