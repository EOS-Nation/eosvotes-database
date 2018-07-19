import assert from "assert";
import { Collection, MongoClient } from "mongodb";
import { format } from "util";
import { dbName, pass, user} from "../config";

const url = `mongodb://${user}:${pass}@localhost:27017/?authMechanism=SCRAM-SHA-1&authSource=admin`;

// Use connect method to connect to the server
(async () => {
  const client = await MongoClient.connect(url, { useNewUrlParser: true });
  console.log("Connected successfully to server");
  const db = client.db(dbName);

  // Search within min & max head block number
  const query = {head_block_num: {$gte: 6600000, $lte: 6800000}};
  // Sort by last head block number
  const sort = {account_name: 1, head_block_num: -1};
  const fields = {_id: false, __v: false};
  const cursor = db.collection("weights").find(query, {fields, sort});

  const uniques: any = {};
  let weights = await cursor.toArray();

  // Don't include duplicates accounts
  weights = weights.filter((weight) => {
    if (!uniques[weight.account_name]) {
      uniques[weight.account_name] = true;
      return true;
    }
    return false;
  });

  const totalWeight = weights.reduce((total: number, weight) => weight.weight + total, 0);
  console.log(totalWeight / 10000, "EOS");
})();
