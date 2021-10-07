import mongodb from 'mongodb'

const client = new mongodb.MongoClient('mongodb://localhost:27017')

export async function conexion(callback){
    await client.connect()

    const result = await callback(client.db("MongoC1"))

    await client.close()

    return result
}

