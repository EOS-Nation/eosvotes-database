import { MongoClient } from "mongodb";
import { pass, user} from "../config";

const url = `mongodb://${user}:${pass}@localhost:27017/?authMechanism=SCRAM-SHA-1&authSource=admin`;

export default () => {
  return MongoClient.connect(url, { useNewUrlParser: true });
};
