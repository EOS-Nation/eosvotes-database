import mongoose from "mongoose";
import eosioForumListener from './listeners/eosio.forum';
import eosioListener from './listeners/eosio';

mongoose.connect('mongodb://localhost:27017/eosvotes', (err) => {
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