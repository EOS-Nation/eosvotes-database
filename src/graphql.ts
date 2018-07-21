import { graphiqlExpress, graphqlExpress } from "apollo-server-express";
import bodyParser from "body-parser";
import express from "express";
import { makeExecutableSchema } from "graphql-tools";
import { resolvers, typeDefs } from "./graphql-schemas";
// import connect from "./mongodb";

export default async function graphql() {
  // // Initialize MongoDB client
  // const client = await connect();
  // const db = client.db;

  // Initialize the app
  const app = express();

  // Put together a GraphQL schema
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  // The GraphQL endpoint
  app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));

  // GraphiQL, a visual editor for queries
  app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

  // Start the server
  app.listen(3000, () => {
    console.log("Go to http://localhost:3000/graphiql to run queries!");
  });
}

graphql();
