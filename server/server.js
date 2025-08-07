import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import userRoutes from './routes/userRoutes.js'

dotenv.config()
const app = express()

app.use(cors)
app.use(express.json())
app.use('/api/users', userRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));


const PORT = process.env.PORT || 5000
 app.listen(PORT,  () => {
    console.log("running on ",PORT);
})