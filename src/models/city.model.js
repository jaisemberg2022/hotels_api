import { DataTypes } from 'sequelize'
import db from '../db/connect.js'

const City = db.define('city', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false
  },
  countryId: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

export default City
