import express from 'express'
import routerPersonajesApi from './routers/personajesAPIRouter.js'
import routerPersonajes from './routers/personajesRouter.js'
const app = express()

app.set('views', './views') // specify the views directory
app.set('view engine', 'ejs') // register the template engine

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.use('/api/personajes', routerPersonajesApi) // API REST

app.use('/personajes', routerPersonajes) // Pagina Web

app.listen(80, function () {
    console.log("Server ON!")
})

