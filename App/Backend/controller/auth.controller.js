import authDao from "../model/auth.dao.js";
import { generate } from "../middleware/tokeValidator.js";

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

function register(req, res) {
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }

    authDao.register(user)
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