import { CronJob } from 'cron';
import { basicFilter, task, API } from './utils';
import { savePost, saveRemove, saveVote } from '../controllers';

// Global Memory - Store Transactions IDs
const trx_ids = {}

// Listeners = Cron Jobs that listen on accounts and store data into MongoDB
export default function eosioForumListener() {
  console.log('start eosio.forum listener')

  new CronJob('*/2 * * * * *', async () => {
    const dataset = await task('eosforumtest', basicFilter, API, trx_ids)
    for (const data of dataset) {
      switch (data['action.name']) {
        case 'post':
          savePost(data)
          break;
        case 'vote':
          saveVote(data)
          break;
        case 'remove':
          saveRemove(data)
          break;
      }
    }
  }, () => {}, true, 'America/Toronto')
}