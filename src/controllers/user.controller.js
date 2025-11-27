import jwt from 'jsonwebtoken'
import { catchError } from '../middlewares/catchError.js'
import User from '../models/user.model.js'
import { env } from '../config/env.js'

export const getAll = catchError(async (req, res) => {
  const results = await User.findAll()
  return res.json(results)
})

export const create = catchError(async (req, res) => {
  const result = await User.create(req.body)
  return res.status(201).json(result)
})

export const getOne = catchError(async (req, res) => {
  const { id } = req.params
  const result = await User.findByPk(id)
  if (!result) return res.sendStatus(404)
  return res.json(result)
})

export const remove = catchError(async (req, res) => {
  const { id } = req.params
  await User.destroy({ where: { id } })
  return res.sendStatus(204)
})

export const update = catchError(async (req, res) => {
  const { id } = req.params
  const { password, ...restData } = req.body
  const result = await User.update(
    restData,
    { where: { id }, returning: true }
  )
  if (result[0] === 0) return res.sendStatus(404)
  return res.json(result[1][0])
})

export const login = catchError(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ where: { email } })
  const isValid = user && await user.compare(password)
  if (!isValid) return res.status(401).json({ message: 'Invalid credentials' })
  const token = jwt.sign({ user }, env.SECRET_KEY, { expiresIn: env.EXPIRES_IN })
  return res.json({ token, user })
})