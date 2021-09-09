import express from 'express'
import { promises } from 'fs'

const router = express.Router()

function mw_access(req, res, next) {
    console.log(req.connection.remoteAddress)
    if(req.query.pass === '123'){
        next()
    }
    else{
        res.status(401).json({err: 401, msg: 'Usted no esta autorizado para hacer esta accion.'})
    }
}

router.route('/')
    .get(function (req, res) {
        promises.readFile('./data/personajes.json')
            .then(function (data) {
                const personajes = JSON.parse(data.toString())

                res.status(200).json(personajes.filter(function (element) {
                    return element.deleted != true
                }))
            })
            .catch(function (err) {
                res.status(500)
                res.json({ err: 500, msg: err.message })
            })
    })
    .post(function (req, res) {
        promises.readFile('./data/personajes.json')
            .then(function (data) {
                const personajes = JSON.parse(data.toString())
                const per = req.body
                per.id = personajes.length + 1

                personajes.push(per);

                promises.writeFile('./data/personajes.json', JSON.stringify(personajes))
                    .then(function () {
                        res.status(201).json(per)
                    })
            })
            .catch(function (err) {
                res.status(500)
                res.json({ err: 500, msg: err.message })
            })
    })

router.route('/:id')
    .get(function (req, res) {
        promises.readFile('./data/personajes.json')
            .then(function (data) {
                const personajes = JSON.parse(data.toString())
                const per = personajes.find(function (p) {
                    return p.id == req.params.id
                })

                if (per) {
                    if (per.deleted != true) {
                        res.status(200).json(per)
                    }
                    else {
                        res.status(404).json({ err: 404, msg: `El personaje #${req.params.id} fue eliminado.` })
                    }
                }
                else {
                    res.status(404).json({ err: 404, msg: `No se encuentra el personaje #${req.params.id}` })
                }

            })
            .catch(function (err) {
                res.status(500)
                res.json({ err: 500, msg: err.message })
            })
    })
    .put([mw_access],function (req, res) {
        promises.readFile('./data/personajes.json')
            .then(function (data) {
                const personajes = JSON.parse(data.toString())
                let per = personajes.find(function (p) {
                    return p.id == req.params.id
                })

                if (per?.deleted != true) {

                    const index = personajes.indexOf(per)
                    personajes[index] = { ...req.body, id: parseInt(req.params.id) }

                    // per = { ...req.body, id: per.id }

                    promises.writeFile('./data/personajes.json', JSON.stringify(personajes))
                        .then(function () {
                            res.status(200).json(personajes[index])
                        })
                }
                else {
                    res.status(404).json({ err: 404, msg: `No se encuentra el personaje #${req.params.id}` })
                }

            })
            .catch(function (err) {
                res.status(500)
                res.json({ err: 500, msg: err.message })
            })
    })
    .patch([mw_access],function (req, res) {
        promises.readFile('./data/personajes.json')
            .then(function (data) {
                const personajes = JSON.parse(data.toString())
                let per = personajes.find(function (p) {
                    return p.id == req.params.id
                })

                if (per) {

                    const index = personajes.indexOf(per)
                    personajes[index] = { ...personajes[index], ...req.body, id: per.id }

                    promises.writeFile('./data/personajes.json', JSON.stringify(personajes))
                        .then(function () {
                            res.status(200).json(personajes[index])
                        })
                }
                else {
                    res.status(404).json({ err: 404, msg: `No se encuentra el personaje #${req.params.id}` })
                }

            })
            .catch(function (err) {
                res.status(500)
                res.json({ err: 500, msg: err.message })
            })
    })
    .delete([mw_access],function (req, res) {
        promises.readFile('./data/personajes.json')
            .then(function (data) {

                const personajes = JSON.parse(data.toString())
                const per = personajes.find(function (p) {
                    return p.id == req.params.id
                })

                if (per) {
                    per.deleted = true

                    promises.writeFile('./data/personajes.json', JSON.stringify(personajes))
                        .then(function () {
                            res.status(200).json(per)
                        })
                }
                else {
                    res.status(404).json({ err: 404, msg: `No se encuentra el personaje #${req.params.id}` })
                }

            })
            .catch(function (err) {
                res.status(500)
                res.json({ err: 500, msg: err.message })
            })

    })

export default router