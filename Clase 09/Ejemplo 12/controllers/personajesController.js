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
    promises.readFile('./data/personajes.json')
        .then(function (data) {
            const personajes = JSON.parse(data.toString())
            const per = req.body
            per.id = personajes.length + 1

            personajes.push(per);

            promises.writeFile('./data/personajes.json', JSON.stringify(personajes))
                .then(function () {
                    res.render("personaje", per)
                })
        })
        .catch(function (err) {
            res.status(500)
            res.json({ err: 500, msg: err.message })
        })


}


export default {
    viewAll,
    formNuevoPersonaje,
    crearPersonaje
}