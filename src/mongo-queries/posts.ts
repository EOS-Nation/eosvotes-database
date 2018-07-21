import { Collection, Db } from "mongodb";

/**
 * Find Posts
 *
 * @param {Db} db MongoDB Database
 * @param {Object} [options={}] Optional Parameters
 * @param {number} [options.lte_block_num] Less-than or equal (<=) the Head Block Number
 * @param {number} [options.gte_block_num] Greater-than or equal (>=) the Head Block Number
 * @param {string} [options.trx_id] Transaction ID
 * @param {string} [options.post_uuid] Post UUID
 * @param {string} [options.poster] Poster Account Name
 * @param {string} [options.reply_to_poster] Reply to Poster Account Name
 * @param {string} [options.reply_to_post_uuid] Reply to Post UUID
 * @returns {AggregationCursor} MongoDB Aggregation Cursor
 * @example
 * const posts = await findPosts(collection, {reply_to_post_uuid: "d0a33f1e-95a5-42a9-bab4-3d4f9c61be50"});
 * console.log(await posts.toArray());
 */
export function findPosts(db: Db, options: {
    lte_block_num?: number,
    gte_block_num?: number,
    // Extra filters for Posts
    trx_id?: string,
    post_uuid?: string,
    poster?: string,
    reply_to_poster?: string,
    reply_to_post_uuid?: string,
} = {}) {
    const collection = db.collection("posts");

    // Filter by Head Block Number
    const $match: any = {};
    if (options.lte_block_num || options.gte_block_num) { $match.head_block_num = {}; }
    if (options.lte_block_num) { $match.head_block_num.$lte = options.lte_block_num; }
    if (options.gte_block_num) { $match.head_block_num.$gte = options.gte_block_num; }

    // Extras Filters for Posts
    if (options.trx_id) { $match.trx_id = options.trx_id; }
    if (options.post_uuid) { $match.post_uuid = options.post_uuid; }
    if (options.poster) { $match.poster = options.poster; }
    if (options.reply_to_poster) { $match.reply_to_poster = options.reply_to_poster; }
    if (options.reply_to_post_uuid) { $match.reply_to_post_uuid = options.reply_to_post_uuid; }

    // Sort by highest "latest" block number (most recent weight)
    const sort = { head_block_num: -1 };
    const fields = { _id: 0, __v: 0 };

    return collection.find($match, {sort, fields});
}
