import authDao from "../model/auth.dao.js";
import { generate } from "../middleware/tokeValidator.js";
import * as yup from 'yup'

function login(req, res){
    authDao.login(req.body.email, req.body.password)
    .then(function (data){

        console.log(data)
        const token = generate({
            id: data.id,
            name: data.name,
            email: data.email
        })


        res.header('auth-token', token).json({user: data, token: token})
    })
    .catch(function(err){
        if(err.error){
            res.status(401).json({ error: 401, msg: err.msg })
        }
        else{
            res.status(500).json({ error: 500, msg: "Ocurrio un error", err })
        }
    })
}

const schema = yup.object({
    email: yup.string().email().required("El email es obligatorio JEJE"),
    password: yup.string().min(6).required(),
    name: yup.string().required()
}).noUnknown()

function register(req, res) {
    
    schema.validate(req.body)
    .then(function (data){
        console.log("Validate: ", data)
        authDao.register(data)
        .then(function () {
            res.json({ msg: "Usuario registrado con exito!" })
        })
        .catch(function (err) {
            if(err.error){
                res.status(400).json({ error: 400, msg: err.msg })
            }
            else{
                res.status(500).json({ error: 500, msg: "Ocurrio un error", err })
            }
            
        })
    })
    .catch(function(err){
        res.status(400).json({ error: 400, msg: "Error en los datos", err: err.errors })
    })

    
}

export function findAll(req, res){
    authDao.findAll()
    .then(function(result){
        res.json(result)
    })
    .catch(function (err) {
        if(err.error){
            res.status(400).json({ error: 400, msg: err.msg })
        }
        else{
            res.status(500).json({ error: 500, msg: "Ocurrio un error", err })
        }
    })
}

export function getLogin(req, res){
    res.json(req.user)
}

export default {
    register,
    login,
    findAll,
    getLogin
}