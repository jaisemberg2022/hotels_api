import { Sequelize } from 'sequelize'
import { env } from '../config/env.js'

const sequelize = new Sequelize(env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false
})

export const connectDB = async () => {
  await sequelize.authenticate()
  console.log('Conexión a la base de datos establecida correctamente')
  await sequelize.sync({ alter: false })
  console.log('Tablas sincronizadas correctamente')
}

export default sequelize