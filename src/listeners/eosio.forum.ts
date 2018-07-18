import { CronJob } from 'cron';
import { basicFilter, task } from '../actions';
import { saveAccount, savePost, saveUnpost, savePropose, saveUnpropose, saveVote } from '../controllers';

// Listeners = Cron Jobs that listen on accounts and store data into MongoDB
export default function eosioForumListener() {
  console.log('start eosio.forum listener')

  // Global Transactions ids
  const trx_ids: any = {}

  new CronJob('*/2 * * * * *', async () => {
    const dataset = await task('eosforumtest', basicFilter)
    for (const data of dataset) {
      // Prevent from adding duplicate transactions
      if (trx_ids[data.action.trx_id]) continue
      else trx_ids[data.action.trx_id] = true

      switch (data.action.name) {
        case 'post':
          savePost(data)
          saveAccount(data.poster)
          break;
        case 'vote':
          saveVote(data)
          saveAccount(data.voter)
          break;
        case 'unpost':
          saveUnpost(data)
          break;
        case 'propose':
          savePropose(data)
          break;
        case 'unpropose':
          saveUnpropose(data)
          break;
      }
    }
  }, () => {}, true, 'America/Toronto')
}