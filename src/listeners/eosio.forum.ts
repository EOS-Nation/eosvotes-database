import { CronJob } from 'cron';
import { basicFilter, task } from '../actions';
import { savePost, saveRemove, saveVote } from '../controllers';

// Listeners = Cron Jobs that listen on accounts and store data into MongoDB
export default function eosioForumListener() {
  console.log('start eosio.forum listener')

  new CronJob('*/5 * * * * *', async () => {
    const dataset = await task('eosforumtest', basicFilter)
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