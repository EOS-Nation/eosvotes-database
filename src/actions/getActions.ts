import axios from 'axios';

/**
 * General purpose Task
 *
 * @param {string} account_name Account name for Smart Contract
 * @param {Function} filter Filter Actions
 * @param {string} [api='https://api.eosn.io'] EOSIO API with filter enabled
 */
export async function task(account_name: string, filter: (actions: any) => any[], api='https://api.eosn.io') {
  const params = {
    account_name,
    pos: -1,
    offset: -25,
  }
  const actions = await getActions(params, api)

  return filter(actions)
}

/**
 * Get Actions
 *
 * @param {Object} params action params
 * @param {string} [api] EOSIO API endpoint with filters
 * @returns {Object} actions
 */
export async function getActions(params: any, api='https://api.eosn.io') {
  const url = `${api}/v1/history/get_actions`
  const configs = { responseType: 'JSON' }
  const request = await axios.post(url, params, configs)
  return request.data
}

/**
 * Basic Filter to extract Data from Actions
 *
 * @param {Object} actions Array of Actions
 * @returns {Array<Object>} Array of Data
 */
export function basicFilter(actions: any): any[] {
  const results = []
  for (const action of actions.actions) {
    // Extract variables from EOSIO get_action
    const {action_trace, block_num, block_time} = action;
    const {act, trx_id} = action_trace;
    const {data, account, name} = act;

    // Store Result as an Array
    const result = Object.assign(data, {
      'action.account': account,
      'action.name': name,
      'action.trx_id': trx_id,
      'action.block_num': block_num,
      'action.block_time': block_time
    });
    results.push(result)
  }
  return results
}