import express from 'express'
import authRouter from './router/auth.router.js'

const app = express()

// ParseBody JSON
app.use(express.json())
app.use('/user', authRouter)


app.listen(9001, function(){
    console.log("Server ON!")
})



