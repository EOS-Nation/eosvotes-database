import { MongoClient } from "mongodb";

/**
 * Get Account Actions
 *
 * @param {MongoClient} client MongoDB Client
 * @param {string} name Account Name
 * @param {Array<string>} filterFields Filter account name by specific fields
 * @param {Array<string>} filterActions Filter by actions names
 * @param {Object} [options={}] Optional Parameters
 * @param {number} [options.lte_block_num] Less-than or equal (<=) the Reference Block Number
 * @param {number} [options.gte_block_num] Greater-than or equal (>=) the Head Block Number
 * @returns {AggregationCursor} MongoDB Aggregation Cursor
 * @example
 * const filterFields = ["data.from", "data.receiver"];
 * const filterActions = ["undelegatebw", "delegatebw"];
 * const options = {
 *     lte_block_num: 50000,
 *     gte_block_num: 25000,
 * };
 * const actions = await getAccountActions(client, "heztcmjqgege", fields, actions, options);
 * console.log(await actions.toArray());
 */
export function getAccountActions(client: MongoClient, name: string, filterFields: string[], filterActions: string[], options: {
    lte_block_num?: number,
    gte_block_num?: number,
} = {}) {
    // Setup MongoDB collection
    const db = client.db("EOS");
    const collection = db.collection("actions");

    const pipeline: any = [
        // Filter accounts based on specific fields using name
        {
            $match: { $or: filterFields.map((field) => {
                const filter: any = {};
                filter[field] = name;
                return filter;
            })},
        },

        // Filter only specific actions
        {
            $match: { $or: filterActions.map((action) => {
                return { name: action };
            })},
        },
        // Get Block Number from Transaction Id
        {
            $graphLookup: {
                from: "transactions",
                startWith: "$trx_id",
                connectFromField: "trx_id",
                connectToField: "trx_id",
                as: "transaction",
            },
        },
        // Filter only required fields
        {
            $project: {
                _id: 0,
                account: 1,
                name: 1,
                data: 1,
                trx_id: 1,
                ref_block_num: { $arrayElemAt: [ "$transaction.transaction_header.ref_block_num", 0 ] },
            },
        },
    ];
    // Optional Pipeline filters

    // Filter by Reference Block Number
    if (options.lte_block_num) { pipeline.push({$match: {ref_block_num: {$lte: options.lte_block_num }}}); }
    if (options.gte_block_num) { pipeline.push({$match: {ref_block_num: {$gte: options.gte_block_num }}}); }

    return collection.aggregate(pipeline);
}

(async () => {
    const client = await MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true });
    const filterFields = ["data.from", "data.receiver"];
    const filterActions = ["delegatebw", "undelegatebw"];
    const options = {
        lte_block_num: 50000,
        gte_block_num: 25000,
    };
    const actions = await getAccountActions(client, "guytgnzxg4ge", filterFields, filterActions, options);
    console.log(await actions.toArray());
})();
