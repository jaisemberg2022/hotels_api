import { Router } from 'express'
import { getAll, create, getOne, remove, update, login } from '../controllers/user.controller.js'
import { auth } from '../middlewares/auth.js'

const router = Router()

router.route('/users')
  .get(auth, getAll)
  .post(create)

router.route('/users/login')
  .post(login)

router.route('/users/:id')
  .get(auth, getOne)
  .delete(remove)
  .put(auth, update)

export default router