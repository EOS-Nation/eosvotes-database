// The GraphQL schema in string form
export const typeDefs = `
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
        # Voting Tally
        tally(post_uuid: String): Tally

        # Account Weights (voting power)
        weights(
            lte_block_num: Int,
            gte_block_num: Int
        ): [Weight]

        # Posts for eosio.forum
        posts(
            lte_block_num: Int,
            gte_block_num: Int,
            trx_id: String,
            post_uuid: String,
            poster: String,
            reply_to_poster: String,
            reply_to_post_uuid: String
        ): [Post]
    }
`;
