import mongoose from "mongoose";
import config from "../config";
import * as crawlers from "./crawlers";
import * as listeners from "./listeners";

// Retry connection
function connect() {
  console.log("MongoDB connection with retry");
  return mongoose.connect(config.db.mongo.uri, config.db.mongo.options);
}

// Exit application on error
mongoose.connection.on("error", (err) => {
  console.log(`MongoDB connection error: ${err}`);
  setTimeout(connect, 5000);
  // process.exit(-1)
});

mongoose.connection.on("connected", async () => {
    // listeners.eosio();
    // listeners.eosioForum();
    await crawlers.eosioForum();
});

if (config.env === "development") {
    mongoose.set("debug", true);
}

connect();
