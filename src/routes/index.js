import { Router } from 'express'
import userRoutes from './user.route.js'
import citiesRoutes from './city.route.js'
import hotelsRoutes from './hotel.route.js'
import reservationRoutes from './reservation.route.js'
import reviews from './review.route.js'

const router = Router()

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' })
})

router.use(userRoutes)
router.use(citiesRoutes)
router.use(hotelsRoutes)
router.use(reservationRoutes)
router.use(reviews)

export default router
