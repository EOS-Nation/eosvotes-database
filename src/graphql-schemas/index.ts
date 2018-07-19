import { makeExecutableSchema } from "graphql-tools";
import { filter, find } from "lodash";
import connect from "../mongodb";

const posts: any[] = require("../../test/data/posts.json");
const weights: any[] = require("../../test/data/weights.json");

// Convert JSON Metadata to String
posts.forEach((value, index) => {
    posts[index].json_metadata = JSON.stringify(posts[index].json_metadata);
});

// The GraphQL schema in string form
const typeDefs = `
    # Action
    type Action {
        # Block Number
        block_num: Int,

        # Block Time
        block_time: String,

        # Name
        name: String,

        # Account
        account: String,

        # Transaction ID
        trx_id: String
    }
    # Post
    type Post {
        # Action
        action: Action,

        # Poster
        poster: String,

        # Post UUID
        post_uuid: String,

        # Content
        content: String,

        # Reply to Poster
        reply_to_poster: String,

        # Reply to Post UUID
        reply_to_post_uuid: String,

        # Certify
        certify: Int

        # JSON Metadata
        json_metadata: String
    }
    # Weight
    type Weight {
        # Head Block Number
        head_block_num: Int,

        # Head Block Time
        head_block_time: String,

        # Account Name
        account_name: String,

        # Net Weight
        net_weight: Int,

        # CPU Weight
        cpu_weight: Int,

        # Total Weight
        weight: Int
    }

    # Tally
    type Tally {
        # Post UUID
        post_uuid: String,

        # Voters Count
        voters_count: Int

        # Voters
        voters: [Weight]

        # Weight
        votes: String,
    }

    # Query
    type Query {
        # Vote Tally
        tally(post_uuid: String): Tally

        # Multiple Weights
        weights(min_block_num: Int, max_block_num: Int, min_weight: Int, max_weight: Int): [Weight]

        # Multiple Posts
        posts(poster: String): [Post]

        # Single Post
        post(post_uuid: String, trx_id: String): Post
    }
`;

// The resolvers
const resolvers: any = {
    Query: {
        tally: (_: any, { post_uuid, min_block_num, max_block_num }: any) => {
            if (!post_uuid) { throw new Error("post_uuid is required"); }
            const posters: any = {};
            const uniques: any = {};
            const voters: any[] = [];
            let votes = 0;

            // Retrieve all voters for post
            posts.forEach((item) => {
                const {poster} = item;
                // exclude posts not related to Post UUID
                if (post_uuid !== item.post_uuid && post_uuid !== item.reply_to_post_uuid) { return false; }
                posters[poster] = poster;
            });

            // Calculate weights of all voters for a giving post
            weights.forEach((item) => {
                const {account_name, weight, head_block_num} = item;
                // Exclude votes that are not within Min & Max blocks
                if (min_block_num && head_block_num <= min_block_num) { return false; }
                if (max_block_num && head_block_num >= max_block_num) { return false; }

                // Prevent duplicate accounts
                if (uniques[account_name]) { return false; }
                uniques[account_name] = true;

                // Accumulate Poster's voting weight
                if (posters[account_name]) {
                    votes += weight;
                    voters.push(item);
                }
            });

            // Metrics
            const voters_count = voters.length;

            return {
                post_uuid,
                voters_count,
                voters,
                votes: `${votes / 10000} EOS`,
            };
        },
        weights: (_: any, { min_block_num, max_block_num, min_weight, max_weight }: any) => {
            const uniques: any = {};
            return weights.filter(({head_block_num, weight, account_name}) => {
                if (min_block_num && head_block_num <= min_block_num) { return false; }
                if (max_block_num && head_block_num >= max_block_num) { return false; }
                if (min_weight && weight <= min_weight) { return false; }
                if (max_weight && weight >= max_weight) { return false; }

                // Prevent duplicate accounts
                if (uniques[account_name]) { return false; }
                uniques[account_name] = true;
                return true;
            });
        },
        posts: (_: any, { poster }: any) => {
            if (poster) { return filter(posts, {poster}); }
            return posts;
        },
        post: (_: any, { post_uuid, trx_id }: any) => {
            if (trx_id) { return find(posts, { action: {trx_id} }); }
            return find(posts, { post_uuid });
        },
    },
};

// Put together a schema
export default makeExecutableSchema({
    typeDefs,
    resolvers,
});
