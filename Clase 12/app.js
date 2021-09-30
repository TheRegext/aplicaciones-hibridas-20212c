import express from 'express'
import mongodb from 'mongodb'


const app = express()

// Conexion String
//const client = new mongodb.MongoClient('mongodb://localhost:27017')
const client = new mongodb.MongoClient('mongodb://192.168.188.129:27017')

app.get('/', function (req, res) {
    client.connect()
        .then(function () {
            const db = client.db("MongoC1") // use MongoC1
            // findOne lo utilizaremos cuando tenemos que traer un documento por ID
            return db.collection("personajes").findOne({ _id: mongodb.ObjectId(req.query.id) })
        })
        .then(function (personaje) {
            res.json(personaje)
        })
        .catch(function (err) {
            res.json({ err })
        })
        .finally(function () {
            client.close()
        })
})



app.get('/all', function (req, res) {
    client.connect()
        .then(function () {
            const db = client.db("MongoC1")

            // traer muchos, esto es un cursor (no es un array) tampoco es una promesa
            let personajes = db.collection("personajes").find()

            // lo convertimos a array para devolver en el JSON
            return personajes.toArray()
        })
        .then(function (personaje) {
            res.json(personaje)
        })
        .catch(function (err) {
            res.json({ err })
        })
        .finally(function () {
            client.close()
        })
})



app.get('/insert', function (req, res) {
    client.connect() // conecto al servidor
        .then(function () {
            const db = client.db("MongoC1") // conecto a la base de datos (use MongoC1)

            return db.collection("personajes").insertOne({ name: req.query.name })

        })
        .then(function (personaje) {
            res.json(personaje)
        })
        .catch(function (err) {
            res.json({ err })
        })
        .finally(function () {
            client.close()
        })
})

app.get('/delete', function (req, res) {
    client.connect()
        .then(function () {
            const db = client.db("MongoC1") // use MongoC1
            // 
            return db.collection("personajes").deleteOne({ _id: mongodb.ObjectId(req.query.id) })
        })
        .then(function (personaje) {
            res.json(personaje)
        })
        .catch(function (err) {
            res.json({ err })
        })
        .finally(function () {
            client.close()
        })
})


app.get('/replace', function (req, res) {
    client.connect()
        .then(function () {
            const db = client.db("MongoC1") // use MongoC1
            //                                             ID del documento                     , nuevos datos del documento
            return db.collection("personajes").replaceOne({ _id: mongodb.ObjectId(req.query.id) }, { name: req.query.name })
        })
        .then(function (personaje) {
            res.json(personaje)
        })
        .catch(function (err) {
            res.json({ err })
        })
        .finally(function () {
            client.close()
        })
})

app.get('/update', function (req, res) {
    client.connect()
        .then(function () {
            const db = client.db("MongoC1") // use MongoC1
            //                                             ID del documento
            return db.collection("personajes").updateOne({ _id: mongodb.ObjectId(req.query.id) },
            { // Datos a actualizar
                $set:{
                    name2: req.query.name 
                }
                 
            })
        })
        .then(function (personaje) {
            res.json(personaje)
        })
        .catch(function (err) {
            res.json({ err })
        })
        .finally(function () {
            client.close()
        })
})




app.listen(80, function () {
    console.log("Server ON!")
})

