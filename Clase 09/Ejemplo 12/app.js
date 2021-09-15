import express from 'express'
import routerPersonajesAp from './routers/personajesAPIRouter.js'
import routerPersonajes from './routers/personajesRouter.js'
const app = express()

app.set('views', './views') // specify the views directory
app.set('view engine', 'ejs') // register the template engine

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.use('/api/personajes', routerPersonajesAp)

app.use('/personajes', routerPersonajes)

app.listen(80, function () {
    console.log("Server ON!")
})

