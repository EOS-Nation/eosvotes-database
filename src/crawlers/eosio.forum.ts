import { basicFilter, task } from "../actions/actions";
import { savePost, savePropose, saveUnpost, saveUnpropose, saveVote, saveWeight } from "../controllers";

export default function eosioForumCrawler() {
    console.log("start eosio.forum crawler");
    const api = "https://api.eosn.io";
    let pos = 0;
    const offset = 249;
    let total = 0;

    return new Promise(async (resolve, reject) => {
        while (true) {
            const dataset = await task("eosforumtest", basicFilter, api, pos, offset);
            for (const data of dataset) {
                switch (data.action.name) {
                case "post":
                    if (data.poster) {
                        savePost(data);
                        await saveWeight(data.poster);
                    }
                    break;
                case "vote":
                    if (data.voter) {
                        saveVote(data);
                        await saveWeight(data.voter);
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
            total += dataset.length;
        }
        // Crawler finished
        return resolve(true);
    });
}
