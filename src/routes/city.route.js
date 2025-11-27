import { Router } from 'express'
import { getAll, create, update, remove } from '../controllers/city.controller.js'
import { auth } from '../middlewares/auth.js'

const router = Router()

// público
router.get('/cities', getAll) 

// privado
router.post('/cities', auth, create)       
router.put('/cities/:id', auth, update)   
router.delete('/cities/:id', auth, remove) 

export default router
