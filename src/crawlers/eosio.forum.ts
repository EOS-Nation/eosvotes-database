import mongoose from "mongoose";
import { basicFilter, task } from "../actions/actions";
import { savePost, savePropose, saveUnpost, saveUnpropose, saveVote, saveWeight } from "../controllers";
import { WeightSchema } from "../models/weight";

const uniqueWeights: any = {};

export default function eosioForumCrawler() {
    console.log("start eosio.forum crawler");
    const api = "https://api.eosn.io";
    let pos = 0;
    const offset = 249;

    return new Promise(async (resolve, reject) => {
        while (true) {
            const dataset = await task("eosforumtest", basicFilter, api, pos, offset);
            for (const data of dataset) {
                switch (data.action.name) {
                case "post":
                    if (data.poster) {
                        savePost(data);
                        if (!uniqueWeights[data.poster]) { await saveWeight(data.poster); }
                        uniqueWeights[data.poster] = true;
                    }
                    break;
                case "vote":
                    if (data.voter) {
                        saveVote(data);
                        if (!uniqueWeights[data.voter]) { await saveWeight(data.voter); }
                        uniqueWeights[data.voter] = true;
                    }
                    break;
                case "unpost":
                    saveUnpost(data);
                    break;
                case "propose":
                    savePropose(data);
                    break;
                case "unpropose":
                    saveUnpropose(data);
                    break;
                }
            }
            if (dataset.length === 0) { break; }
            pos += 250;
        }
        // Crawler finished
        return resolve();
    });
}
