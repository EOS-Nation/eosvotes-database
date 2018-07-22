import { MongoClient } from "mongodb";

/**
 * Aggregate Weights
 *
 * @param {MongoClient} client MongoDB Client
 * @param {Object} [options={}] Optional Parameters
 * @param {number} [options.lte_block_num] Less-than or equal (<=) the Head Block Number
 * @param {number} [options.gte_block_num] Greater-than or equal (>=) the Head Block Number
 * @returns {AggregationCursor} MongoDB Aggregation Cursor
 * @example
 * const weights = await aggregateWeights(client, {gte_block_num: 6915196});
 * console.log(await weights.toArray());
 */
export function aggregateWeights(client: MongoClient, options: {
    lte_block_num?: number,
    gte_block_num?: number,
} = {}) {
    const db = client.db("eosvotes");
    const collection = db.collection("weights");

    // Filter by Head Block Number
    const $match: any = {};
    if (options.lte_block_num || options.gte_block_num) { $match.head_block_num = {}; }
    if (options.lte_block_num) { $match.head_block_num.$lte = options.lte_block_num; }
    if (options.gte_block_num) { $match.head_block_num.$gte = options.gte_block_num; }

    // Sort by highest "latest" block number (most recent weight)
    const $sort = { head_block_num: -1 };
    const $group = { _id: "$account_name", weight: { $first: "$weight" }, head_block_num: { $first: "$head_block_num" } };
    const $project = { _id: 0 };
    const $addFields = { account_name: "$_id" };

    return collection.aggregate([
        { $match },
        { $group },
        { $sort },
        { $addFields },
        { $project },
    ], {
        allowDiskUse: true,
    });
}
