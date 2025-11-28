import { DataTypes } from 'sequelize'
import db from '../db/connect.js'
import User from './user.model.js'
import Hotel from './hotel.model.js'

const Review = db.define('review', {
  rating: {
    type: DataTypes.INTEGER, // 1, 2, 3, 4, 5
    allowNull: false
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false
  },
})

User.hasMany(Review)
Review.belongsTo(User)

Hotel.hasMany(Review)
Review.belongsTo(Hotel)

export default Review
