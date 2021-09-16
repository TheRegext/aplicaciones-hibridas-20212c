import { promises } from 'fs'
import repository from '../repositories/personajesRepository.js'

function viewAll(req, res) {
    repository.getAll()
        .then(function (personajes) {
            res.render('list-personajes', {
                list: personajes
            })
        })
        .catch(function (err) {
            res.status(500).json({ err: 500, msg: err.message })
        })
}

export function formNuevoPersonaje(req, res) {
    res.render("formNuevoPersonaje", {})
}

export function crearPersonaje(req, res) {
    repository.create(req.body)
    .then(function(entity){
        res.render("personaje", entity)
    })
    .catch(function(err){
        res.status(500).send(err.message)
    })
}


export default {
    viewAll,
    formNuevoPersonaje,
    crearPersonaje
}