import db from '../db/connect.js'
import { DataTypes } from 'sequelize'
import Hotel from './hotel.model.js'

const Image = db.define('image', {
  url: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

Hotel.hasMany(Image)
Image.belongsTo(Hotel)

export default Image