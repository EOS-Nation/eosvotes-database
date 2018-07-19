import { CronJob } from "cron";
import { basicFilter, task } from "../actions";
import { saveDelegatebw, saveUndelegatebw } from "../controllers/eosio";
import { saveWeight } from "../controllers/weight";

// Listeners = Cron Jobs that listen on accounts and store data into MongoDB
export default function eosioListener() {
  // Global Transactions ids
  const trx_ids: any = {};

  return new CronJob("*/2 * * * * *", async () => {
    const dataset = await task("eosio", basicFilter);
    for (const data of dataset) {
      // Prevent from adding duplicate transactions
      if (trx_ids[data.action.trx_id]) { continue; } else { trx_ids[data.action.trx_id] = true; }

      switch (data.action.name) {
        case "undelegatebw":
          saveUndelegatebw(data);
          await saveWeight(data.from);
          if (data.from !== data.receiver) { await saveWeight(data.receiver); }
          break;
        case "delegatebw":
          saveDelegatebw(data);
          await saveWeight(data.from);
          if (data.from !== data.receiver) { await saveWeight(data.receiver); }
          break;
      }
    }
  }, () => {
    console.log("start eosio listener");
  }, true, "America/Toronto");
}
