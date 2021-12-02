import dotenv from 'dotenv'
dotenv.config();

export default {
    db: {
        host: process.env.NODE_MONGO_HOST || 'localhost',
        port: process.env.NODE_MONGO_PORT || 27017,
        dbName: process.env.NODE_MONGO_DB || 'DB_C1'
    }
}