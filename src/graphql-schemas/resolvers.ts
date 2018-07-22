import { MongoClient } from "mongodb";
import connect from "../mongodb";

let client: MongoClient;

// The resolvers
export const resolvers: any = {
    Query: {
        tally: (_: any, options: any) => {
            return [];
        },
        weights: async (_: any, options: any) => {
            const results = await aggregateWeights(db, options);
            return await results.toArray();
        },
        posts: async (_: any, options: any) => {
            const results = await findPosts(db, options);
            return await results.toArray();
        },
    },
};

// Intialize MongoDB Client
(async () => {
    client = await connect();
})();
