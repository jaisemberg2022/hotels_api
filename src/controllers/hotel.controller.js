import { catchError } from '../middlewares/catchError.js'
import Hotel from '../models/hotel.model.js'
import City from '../models/city.model.js'
import Image from '../models/image.model.js'
import { Op } from 'sequelize'


export const getAll = catchError(async (req, res) => {
  const {cityId, name} = req.query
  const where = {}
  if (cityId) where.cityId = cityId
  if (name) where.name = {[Op.like]:`%${name}%`}

  const results = await Hotel.findAll({include:[City, Image], where})
  return res.json(results)
})

export const create = catchError(async (req, res) => {
  const result = await Hotel.create(req.body)
  return res.status(201).json(result)
})

export const getOne = catchError(async (req, res) => {
  const { id } = req.params
  const result = await Hotel.findByPk(id, {include: [City, Image]})
  if (!result) return res.sendStatus(404)
  return res.json(result)
})

export const update = catchError(async (req, res) => {
  const { id } = req.params
  const result = await Hotel.update(
    req.body,
    { where: { id }, returning: true }
  )
  if (result[0] === 0) return res.sendStatus(404)
  return res.json(result[1][0])
})

export const remove = catchError(async (req, res) => {
  const { id } = req.params
  await Hotel.destroy({ where: { id } })
  return res.sendStatus(204)
})
