import { Collection, MongoClient } from "mongodb";
import { aggregateWeights, findPosts } from "./mongo-queries";

export function connect(url = "mongodb://localhost:27017") {
  console.log("Connected to", url);
  return MongoClient.connect(url, { useNewUrlParser: true });
}

export let db: any;

// Create MongoDB connection
(async () => {
  if (!db) {
    const client = await connect();
    db = client.db("eosvotes");
  }
  // // Testing
  // const weights = await aggregateWeights(db, {gte_block_num: 6915196});
  // console.log(await weights.toArray());

  // const posts = await findPosts(db, {poster: "eosnationftw"});
  // console.log(await posts.toArray());
})();
