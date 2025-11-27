import supertest from 'supertest'
import app from '../src/app.js'

let id
let token

beforeAll(async () => {
  const credentials = { email: 'jhon@example.com', password: 'pass1234' }
  const res = await supertest(app).post('/users/login').send(credentials)
  token = res.body.token
})

// GET público → Obtener todas las reviews
test('GET /reviews - Obtener todas las reviews', async () => {
  const res = await supertest(app)
    .get('/reviews')
  expect(res.status).toBe(200)
  expect(res.body).toBeInstanceOf(Object)
})

// POST privado → Crear una review
test('POST /reviews - Crear una review', async () => {
  const body = {
    hotelId: 16,
    rating: 5,
    comment: 'Excelente hotel'
  }
  const res = await supertest(app)
    .post('/reviews')
    .send(body)
    .set('Authorization', `Bearer ${token}`)
  id = res.body.id
  expect(res.status).toBe(201)
  expect(res.body).toHaveProperty('id')
})

// PUT privado → Actualizar review
test('PUT /reviews/:id - Actualizar la review', async () => {
  const body = { 
    rating: 4,
    comment: 'Muy buen hotel'
  }

  const res = await supertest(app)
    .put(`/reviews/${id}`)
    .send(body)
    .set('Authorization', `Bearer ${token}`)

  expect(res.status).toBe(200)
  expect(res.body.rating).toBe(body.rating)
  expect(res.body.comment).toBe(body.comment)
   expect(res.body.userId).toBeDefined()
  expect(res.body.hotelId).toBeDefined()
})

// DELETE privado → Eliminar review
test('DELETE /reviews/:id - Eliminar review por ID', async () => {
  const res = await supertest(app)
    .delete(`/reviews/${id}`)
    .set('Authorization', `Bearer ${token}`)
  expect(res.status).toBe(204)
})
