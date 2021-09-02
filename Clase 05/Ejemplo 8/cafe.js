import express from 'express'
import path from 'path'
import {readFile} from 'fs'

const __dirname = path.resolve()

const app = express()

// parse body
app.use(express.urlencoded({ extended: false }))
// parse application/json
app.use(express.json())


app.use(express.static('public'))
app.use(express.static('assets'))

app.get('/', function (req, res){
    res.send("Soy el principal")
})
app.get('/about', function(req, res){
    if(req.query.lang === 'us'){
        res.sendFile('./html/about2.html', {root: __dirname})    
    }
    else{
        res.sendFile('./html/about.html', {root: __dirname})
    }
})

app.get('/param/:id/:nombre', function(req, res){
    res.json({params: req.params, query: req.query, tester: 152})
})



app.get('/contact', function(req, res){
    //res.sendFile('./html/contact.html', {root: __dirname})

    readFile('./html/contact.html', function(err, data){
        let formulario = data.toString()
        
        formulario = formulario.replace("{{NOMBRE}}", req.query.name || '').replace("{{EMAIL}}", req.query.email || "")

        res.setHeader("Content-Type", "text/html; charset=utf-8")

        res.send(formulario)
    })
})

app.post('/contact', function(req, res){
    //res.send("Soy el POST ")

    readFile('./html/contact.html', function(err, data){
        let formulario = data.toString()
        
        formulario = formulario.replace("{{NOMBRE}}", req.body.name || '').replace("{{EMAIL}}", req.body.email || "")

        res.setHeader("Content-Type", "text/html; charset=utf-8")

        res.send(formulario)
    })
})


app.listen(80, function(){
    console.log("El servidor esta ON.")
})



