import mongoose from "mongoose";
import eosioForumListener from './listeners/eosio.forum';
import eosioListener from './listeners/eosio';
import config from '../config'

// Retry connection
function connect() {
  console.log('MongoDB connection with retry')
  return mongoose.connect(config.db.mongo.uri, config.db.mongo.options)
}

// Exit application on error
mongoose.connection.on('error', err => {
  console.log(`MongoDB connection error: ${err}`)
  setTimeout(connect, 5000)
  // process.exit(-1)
})

mongoose.connection.on('connected', () => {
    eosioForumListener()
    eosioListener()
})

if (config.env === 'development') {
    mongoose.set('debug', true)
}

connect()