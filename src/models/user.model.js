import { DataTypes } from 'sequelize'
import bcrypt from 'bcrypt'
import db from '../db/connect.js'

const User = db.define('user', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  genre: {
    type: DataTypes.ENUM(['MALE', 'FEMALE', 'OTHER']),
    allowNull: false
  }
})

User.beforeCreate(async (user) => {
  if (user.password) user.password = await bcrypt.hash(user.password, 10)
})

User.prototype.compare = async function (password) {
  return await bcrypt.compare(password, this.password)
}

User.prototype.toJSON = function () {
  const values = { ...this.get() }
  delete values.password
  return values
}

export default User