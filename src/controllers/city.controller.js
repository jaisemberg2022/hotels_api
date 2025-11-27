import { catchError } from '../middlewares/catchError.js'
import City from '../models/city.model.js'

export const getAll = catchError(async (req, res) => {
  const results = await City.findAll()
  return res.json(results)
})

export const create = catchError(async (req, res) => {
  const result = await City.create(req.body)
  return res.status(201).json(result)
})

export const update = catchError(async (req, res) => {
  const { id } = req.params
  const result = await City.update(
    req.body,
    { where: { id }, returning: true }
  )
  if (result[0] === 0) return res.sendStatus(404)
  return res.json(result[1][0])
})

export const remove = catchError(async (req, res) => {
  const { id } = req.params
  await City.destroy({ where: { id } })
  return res.sendStatus(204)
})
