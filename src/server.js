import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import connectDB from './config/db'
import router from './routes/todo.route'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

connectDB()

app.use('/todos', router)

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Todo API is running' })
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ err: 'Something went wrong' })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

})