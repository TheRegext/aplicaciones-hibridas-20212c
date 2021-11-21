import mongodb from 'mongodb'
import config from '../config.js'

const client = new mongodb.MongoClient(`mongodb://${config.db.host}:${config.db.port}`)

console.log("Data Base Name: ", config.db.dbName)


export async function conection(callbak){
    await client.connect()
    
    const result = await callbak(client.db(process.env.NODE_MONGO_DB))

    await client.close()

    return result
}

export default {
    conection
}