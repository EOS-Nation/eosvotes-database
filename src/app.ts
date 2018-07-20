import mongoose from "mongoose";
import * as crawlers from "./crawlers";
import graphql from "./graphql";
import * as listeners from "./listeners";

const url = `mongodb://mongodb:27017/eosvotes`;

// Retry connection
function connect() {
  console.log("MongoDB connection with retry");
  return mongoose.connect(url);
}

// Exit application on error
mongoose.connection.on("error", (err) => {
    console.log(`MongoDB connection error: ${err}`);
    setTimeout(connect, 5000);
    // process.exit(-1)
});

mongoose.connection.on("connected", async () => {
    // Start Listeners - keeps track of current actions
    listeners.eosio();
    listeners.eosioForum();

    // Start Crawlers - downloads history of all actions
    await crawlers.eosioForum();

    // Start GraphQL endpoint
    graphql();
});

// Debug on
mongoose.set("debug", true);

connect();
