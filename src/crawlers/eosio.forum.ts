import { basicFilter, task } from "../actions/actions";
import { saveAccount, savePost, savePropose, saveUnpost, saveUnpropose, saveVote } from "../controllers";

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
                    // savePost(data)
                    saveAccount(data.poster);
                    break;
                // case 'vote':
                //     saveVote(data)
                //     saveAccount(data.voter)
                //     break;
                // case 'unpost':
                //     saveUnpost(data)
                //     break;
                // case 'propose':
                //     savePropose(data)
                //     break;
                // case 'unpropose':
                //     saveUnpropose(data)
                //     break;
                }
            }
            break;
            if (dataset.length === 0) { break; }
            pos += 250;
            total += dataset.length;
        }
        // Crawler finished
        return resolve(true);
    });
}
