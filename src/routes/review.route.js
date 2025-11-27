import { Router } from 'express'
import { getAll, create, update, remove } from '../controllers/review.controller.js'
import { auth } from '../middlewares/auth.js'

const router = Router()

router.route('/reviews')
    .get(getAll)
    .post(auth,create)

router.route('/reviews/:id')
    .delete(auth,remove)
    .put(auth,update)

export default router
