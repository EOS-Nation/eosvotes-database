import { MongoClient } from "mongodb";

export default function connect(url = "mongodb://localhost:27017") {
  console.log("Connected to", url);
  return MongoClient.connect(url, { useNewUrlParser: true });
}
