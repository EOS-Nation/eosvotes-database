import dotenv from 'dotenv'

dotenv.config()
const user = process.env.MONGO_INITDB_ROOT_USERNAME
const pass = process.env.MONGO_INITDB_ROOT_PASSWORD
const dbName = process.env.MONGO_INITDB_DATABASE

export default {
    db: {
        mongo: {
            uri: `mongodb://mongodb:27017`,
            options: {
                dbName,
                pass,
                user
            }
        }
    },
    env: 'development'
}