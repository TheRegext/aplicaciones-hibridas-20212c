import express from 'express'
import { promises } from 'fs'

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/personajes', function(req, res){
    promises.readFile('./data/personajes.json')
    .then(function(data){
        res.status(200)
        res.setHeader('Content-type', 'application/json')
        res.send(data)
    })
    .catch(function(err){
        res.status(500)
        res.json({err: 500, msg: err.message})
    })
})

app.get('/personajes/:id', function(req, res){
    promises.readFile('./data/personajes.json')
    .then(function(data){
        const personajes = JSON.parse(data.toString())
        const per = 
        
        
        personajes.find(function(p){
                        return p.id == req.params.id
                    })

               
        if(per){
            res.status(200).json(per)
        }
        else{
            res.status(404).json({err: 404, msg: `No se encuentra el personaje #${req.params.id}`})   
        }

    })
    .catch(function(err){
        res.status(500)
        res.json({err: 500, msg: err.message})
    })
})

app.post('/personajes', function(req, res){
    promises.readFile('./data/personajes.json')
    .then(function(data){
        const personajes = JSON.parse(data.toString())
        const per = req.body
        per.id = personajes.length + 1

        personajes.push(per);

        promises.writeFile('./data/personajes.json', JSON.stringify(personajes))
        .then(function(){
            res.status(201).json(per)
        })
        
    })
    .catch(function(err){
        res.status(500)
        res.json({err: 500, msg: err.message})
    })
})


app.listen(80, function(){
    console.log("Server ON!")
})

