import app from './app.js'
import { connectDB } from './db/connect.js'

const serverStart = async () => {
  try {
    await connectDB()
    app.listen(app.get('port'), () => {
      console.log(`Server running on port http://localhost:${app.get('port')}`)
    })
  } catch (error) {
    console.error('Error starting server:', error)
    process.exit(1)
  }
}

serverStart()