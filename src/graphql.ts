import { graphiqlExpress, graphqlExpress } from "apollo-server-express";
import bodyParser from "body-parser";
import express from "express";
import { makeExecutableSchema } from "graphql-tools";
import { eosioForumData } from "../data";

// The GraphQL schema in string form
const typeDefs = `
  type Query { forum: [Forum] }
  type Forum { account: String, post_uuid: String, title: String, content: String, reply_to_account: String, reply_to_post_uuid: String, certify: Int, json_metadata: String, trx_id: String, block_num: Int, block_time: String }
`;

// The resolvers
const resolvers = {
  Query: { forum: () => eosioForumData },
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Initialize the app
const app = express();

// The GraphQL endpoint
app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

// Start the server
app.listen(3000, () => {
  console.log("Go to http://localhost:3000/graphiql to run queries!");
});
