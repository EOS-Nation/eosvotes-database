import { CronJob } from 'cron';
import { basicFilter, task, API } from '../actions';
import { saveDelegatebw, saveUndelegatebw } from '../controllers';

// Listeners = Cron Jobs that listen on accounts and store data into MongoDB
export default function eosioForumListener() {
  console.log('start eosio listener')

  new CronJob('*/1 * * * * *', async () => {
    const dataset = await task('eosio', basicFilter, API)
    for (const data of dataset) {
      switch (data['action.name']) {
        case 'undelegatebw':
          saveUndelegatebw(data)
          break;
        case 'delegatebw':
          saveDelegatebw(data)
          break;
      }
    }
  }, () => {}, true, 'America/Toronto')
}