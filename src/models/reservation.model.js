import { DataTypes } from 'sequelize'
import db from '../db/connect.js'
import User from './user.model.js'
import Hotel from './hotel.model.js'

const Reservation = db.define('reservation', {
  checkIn: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  checkOut: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
})


User.hasMany(Reservation)
Reservation.belongsTo(User)

Hotel.hasMany(Reservation)
Reservation.belongsTo(Hotel)

export default Reservation
