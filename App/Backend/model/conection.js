import mongodb from 'mongodb'

const client = new mongodb.MongoClient('mongodb://localhost:27017')

export async function conection(callbak){
    await client.connect()
    
    const result = await callbak(client.db("DB_C1"))

    await client.close()

    return result
}

export default {
    conection
}