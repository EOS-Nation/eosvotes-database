import { filter, find } from "lodash";
import { aggregateWeights, findPosts } from "../mongo-queries";
import { db } from "../mongodb";

const posts: any[] = require("../../test/data/posts.json");
const weights: any[] = require("../../test/data/weights.json");

// Convert JSON Metadata to String
posts.forEach((value, index) => {
    posts[index].json_metadata = JSON.stringify(posts[index].json_metadata);
});

// The resolvers
export const resolvers: any = {
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
