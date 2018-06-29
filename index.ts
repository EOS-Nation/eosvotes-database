import axios from 'axios';
import {CronJob} from 'cron';

// User Configurations
const API = 'http://api.eosnewyork.io'

// Global Memory - Store Transactions IDs
const trx_ids = {}

/**
 * Scheduler that executes scripts every X seconds
 */
function cron() {
  new CronJob('*/1 * * * * *', async () => {
    // eosio.forum
    task('eosforumtest', basicFilter, API)
  }, null, true, 'America/Toronto')
}
cron()

/**
 * General purpose Task
 *
 * @param {string} account_name Account name for Smart Contract
 * @param {Function} filter Filter Actions
 * @param {string} api EOSIO API with filter enabled
 * @returns {void}
 */
async function task(account_name, filter: (actions: any, trx_id?: any) => any[], api) {
  const params = {
    account_name,
    pos: -1,
    offset: -25,
  }
  const actions = await getActions(params, api)

  for (const data of filter(actions, trx_ids)) {
    process.stdout.write(JSON.stringify(data) + '\n')
  }
}

/**
 * Get Actions
 *
 * @param {Object} params action params
 * @param {string} api EOSIO API endpoint with filters
 * @returns {Object} actions
 */
async function getActions(params, api) {
  const url = `${api}/v1/history/get_actions`
  const configs = { responseType: 'JSON' }
  const request = await axios.post(url, params, configs)
  return request.data
}

/**
 * Basic Filter to extract Data from Actions
 *
 * @param {Object} actions Array of Actions
 * @param {Object} trx_ids Transaction Ids (prevents returning duplicates)
 * @returns {Array<Object>} Array of Data
 */
function basicFilter(actions: any, trx_ids = {}) {
  const results = []
  for (const action of actions.actions) {
    // Extract variables from EOSIO get_action
    const {action_trace, block_num, block_time} = action;
    const {act, trx_id} = action_trace;
    const {data} = act;

    if (!trx_ids[trx_id]) {
      // Store Transaction ID to prevent returning same action twice
      trx_ids[trx_id] = true

      // Store Result as an Array
      const result = Object.assign(data, {trx_id, block_num, block_time});
      results.push(result)
    }
  }
  return results
}