const username = process.env.MONGO_INITDB_ROOT_USERNAME
const password = process.env.MONGO_INITDB_ROOT_PASSWORD

export default {
    db: {
        mongo: {
            uri: 'mongodb://mongodb:27017/eosvotes',
            options: {}
        }
    },
    env: 'development'
}