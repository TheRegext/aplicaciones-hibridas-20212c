import express from 'express'
import personajesRouter from './router/personajes.router.js'

const app = express()

// Parse Body JSON
app.use(express.json())

// Parse Body URL ENCODED (FORMULARIOS)
app.use(express.urlencoded({extended: true}))

app.use('/api/personajes', personajesRouter)


app.listen(80, function () {
    console.log("Server ON!")
})

