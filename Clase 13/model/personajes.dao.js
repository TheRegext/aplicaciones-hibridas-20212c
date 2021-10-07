import mongodb from 'mongodb'
import {conexion} from './database.js'

export async function find() {
    return conexion(async function(db){
        return await db.collection("Personajes").find({}).toArray()
    })
}

export async function insert(entity){
    return conexion(async function(db){
        await db.collection("Personajes").insertOne(entity)
        return entity
    })
}

export async function findById(id){
    return conexion(async function(db){
        return await db.collection("Personajes").findOne({_id: mongodb.ObjectId(id)})
    })
}


export default {
    find,
    insert,
    findById
}


