import { DataTypes } from 'sequelize'
import db from '../db/connect.js'
import City from './city.model.js'

const Hotel = db.define('hotel', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lat: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  lon: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  cityId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
})

City.hasMany(Hotel)
Hotel.belongsTo(City)

export default Hotel
