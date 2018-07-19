import { CronJob } from "cron";
import { basicFilter, task } from "../actions";
import { savePost, savePropose, saveUnpost, saveUnpropose, saveVote, saveWeight } from "../controllers";

// Listeners = Cron Jobs that listen on accounts and store data into MongoDB
export default function eosioForumListener() {
  // Global Transactions ids
  const trx_ids: any = {};

  return new CronJob("*/2 * * * * *", async () => {
    const dataset = await task("eosforumtest", basicFilter);
    for (const data of dataset) {
      // Prevent from adding duplicate transactions
      if (trx_ids[data.action.trx_id]) { continue; } else { trx_ids[data.action.trx_id] = true; }

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
  }, () => {
    console.log("start eosio.forum listener");
  }, true, "America/Toronto");
}
