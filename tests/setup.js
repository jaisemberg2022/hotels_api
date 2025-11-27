import sequelize from '../src/db/connect.js'

/*
  alter: true will update tables to match models without dropping them
  force: true will drop tables and recreate them
*/
beforeAll(async () => {
  await sequelize.sync({ alter: false, force: false })
})

afterAll(async () => {
  await sequelize.close()
})