import express from 'express'
import { promises } from 'fs'
import repository from '../repositories/personajesRepository.js'

const router = express.Router()

function mw_access(req, res, next) {
    console.log(req.connection.remoteAddress)
    if (req.query.pass === '123') {
        next()
    }
    else {
        res.status(401).json({ err: 401, msg: 'Usted no esta autorizado para hacer esta accion.' })
    }
}

router.route('/')
    .get(function (req, res) {
        repository.getAll()
            .then(function (personajes) {
                res.status(200).json(personajes)
            })
            .catch(function (err) {
                res.status(500)
                res.json({ err: 500, msg: err.message })
            })
    })

    .post(function (req, res) {

        repository.create(req.body)
            .then(function (entity) {
                res.status(201).json(entity)
            })
            .catch(function (err) {
                res.status(500).json({ err: 500, msg: err.message })
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
    .put([mw_access], function (req, res) {
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
    .patch([mw_access], function (req, res) {
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
    .delete([mw_access], function (req, res) {
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