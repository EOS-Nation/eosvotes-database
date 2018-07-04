import { CronJob } from 'cron';
import { basicFilter, task } from '../actions/getActions';
import { saveDelegatebw, saveUndelegatebw } from '../controllers/eosio';

// Listeners = Cron Jobs that listen on accounts and store data into MongoDB
export default function eosioListener() {
  console.log('start eosio listener')

  // Global Transactions ids
  const trx_ids: any = {}

  new CronJob('*/2 * * * * *', async () => {
    const dataset = await task('eosio', basicFilter)
    for (const data of dataset) {
      // Prevent from adding duplicate transactions
      if (trx_ids[data['action.trx_id']]) continue
      else trx_ids[data['action.trx_id']] = true

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