import { Router } from 'express'
import { getAll, create, remove } from '../controllers/image.controller.js'
import upload from '../middlewares/upload.js'

const router = Router()

router.route('/images')
    .get(getAll)
    .post(upload.single('image'),  create)

router.route('/images/:id')
    .delete(remove)

export default router
