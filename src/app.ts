import mongoose from "mongoose";
import eosioForumListener from './listeners/eosio.forum';
import eosioListener from './listeners/eosio';

const username = process.env.MONGO_INITDB_ROOT_USERNAME
const password = process.env.MONGO_INITDB_ROOT_PASSWORD

mongoose.connect('mongodb://mongo:27017', (err) => {
    if (err) {
        console.log(err.message);
        console.log(err);
    }
    else {
        console.log('Connected to MongoDb');
        eosioForumListener()
        eosioListener()
    }
});