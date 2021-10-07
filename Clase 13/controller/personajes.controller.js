import dao from '../model/personajes.dao.js'

export function findAll(req, res){
    dao.find()
    .then(function(personajes){
        res.status(200).json(personajes)
    })
    .catch(function(err){
        res.status(500).json(err)
    })
}

export function create(req, res){
    dao.insert(req.body)
    .then(function(personaje){
        res.status(200).json(personaje)
    })
    .catch(function(err){
        res.status(500).json(err)
    })
}

export function findById(req, res){
    dao.findById(req.params.id)
    .then(function(personaje){
        res.status(200).json(personaje)
    })
    .catch(function(err){
        res.status(500).json(err)
    })
}


export default{
    findAll,
    create,
    findById
}