import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'

export const auth = (req, res, next) => {
  const header = req.headers.authorization // 'Bearer token...'
  const token = header && header.split(' ')[1]
  if (!token) return res.sendStatus(401)
  jwt.verify(token, env.SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(401)
    req.user = user
    next()
  })
}
