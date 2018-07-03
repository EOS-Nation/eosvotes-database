import { CronJob } from 'cron';
import { basicFilter, task, API } from './utils';
import { savePost, saveRemove, saveVote } from '../controllers/eosio.forum';

// Global Memory - Store Transactions IDs
const trx_ids = {}

// Listeners = Cron Jobs that listen on accounts and store data into MongoDB
export default function eosioForumListener() {
  console.log('start eosio listener')

  new CronJob('*/2 * * * * *', async () => {
    const dataset = await task('eosio', basicFilter, API, trx_ids)
    for (const data of dataset) {
      switch (data['act.name']) {
        case 'undelegatebw':
          // saveUndelegatebw(data)
          break;
        case 'delegatebw':
          // saveDelegatebw(data)
          break;
      }
    }
  }, () => {}, true, 'America/Toronto')
}