import { Router } from 'express'
import { getAll, create, update, remove, getOne } from '../controllers/hotel.controller.js'
import { auth } from '../middlewares/auth.js'

const router = Router()

router.route('/hotels')
    .get(getAll)
    .post(auth,create)

router.route('/hotels/:id')
    .get(getOne)
    .delete(auth,remove)
    .put(auth,update)

export default router
