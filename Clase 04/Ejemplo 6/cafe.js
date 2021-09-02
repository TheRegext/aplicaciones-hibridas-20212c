import express from 'express'
import path from 'path'

const __dirname = path.resolve()

const app = express()

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


app.listen(80, function(){
    console.log("El servidor esta ON.")
})



