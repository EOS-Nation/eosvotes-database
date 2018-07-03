import axios from 'axios';

// User Configurations
export const API = 'https://api.eosn.io'

/**
 * General purpose Task
 *
 * @param {string} account_name Account name for Smart Contract
 * @param {Function} filter Filter Actions
 * @param {string} [api='https://api.eosn.io'] EOSIO API with filter enabled
 * @param {Object} [trx_ids={}] Transaction IDs
 */
export async function task(account_name: string, filter: <Data = BasicFilterData>(actions: any, trx_id?: any) => Data[], api = API, trx_ids = {}) {
  const params = {
    account_name,
    pos: -1,
    offset: -25,
  }
  const actions = await getActions(params, api)

  return filter(actions, trx_ids)
}

/**
 * Get Actions
 *
 * @param {Object} params action params
 * @param {string} [api] EOSIO API endpoint with filters
 * @returns {Object} actions
 */
export async function getActions(params: any, api=API) {
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
export function basicFilter<Data = BasicFilterData>(actions: any, trx_ids: any = {}): Data[] {
  const results = []
  for (const action of actions.actions) {
    // Extract variables from EOSIO get_action
    const {action_trace, block_num, block_time} = action;
    const {act, trx_id} = action_trace;
    const {data, account, name} = act;

    if (!trx_ids[trx_id]) {
      // Store Transaction ID to prevent returning same action twice
      trx_ids[trx_id] = true

      // Store Result as an Array
      const result = Object.assign(data, {'act.account': account, 'act.name': name, trx_id, block_num, block_time});
      results.push(result)
    }
  }
  return results
}

interface BasicFilterData {
  account: string,
  name: string,
  trx_id: string,
  block_num: number,
  block_time: string,
  [key: string]: any
}