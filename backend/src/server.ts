import express from 'express'
import payload from 'payload'
import { config } from 'dotenv'
import cors from 'cors'

config()

const app = express()

// Add CORS middleware before Payload
app.use(cors({
  origin: '*',
  credentials: true
}))

// Initialize Payload
const start = async () => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET || 'your-secret-key',
    express: app,
    onInit: () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })

  const PORT = process.env.PORT || 3001

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}

start()
