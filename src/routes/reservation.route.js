import { Router } from 'express'
import { getAll, create, update, remove, getOne } from '../controllers/reservation.controller.js'
import { auth } from '../middlewares/auth.js'

const router = Router()

router.use(auth)

router.route('/reservation')
    .get(getAll)
    .post(create)

router.route('/reservation/:id')
    .delete(remove)
    .put(update)
    .get(getOne)


export default router
