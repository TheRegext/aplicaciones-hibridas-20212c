import express from 'express'
import authRouter from './router/auth.router.js'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

const app = express()

// ParseBody JSON
app.use(cors())
app.use(express.json())
app.use('/user', authRouter)


app.listen(9001, function () {
    console.log("Server ON!")

    console.log("MongoDB HOST: ", process.env.NODE_MONGO_DB)

})



