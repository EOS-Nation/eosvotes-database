import axios from 'axios';

/**
 * Get Actions
 *
 * @param {string} account_name Account Name
 * @param {string} [api] EOSIO API endpoint with filters
 * @returns {Object} Account Details
 */
export async function getAccount(account_name: string, api='https://api.eosn.io') {
  const url = `${api}/v1/chain/get_account`
  const configs = { responseType: 'JSON' }
  const request = await axios.post(url, {account_name}, configs)
  return accountFilter(request.data)
}

function accountFilter(data: any) {
  return {
    head_block_num: data.head_block_num,
    head_block_time: data.head_block_time,
    account_name: data.account_name,
    net_weight: data.net_weight,
    cpu_weight: data.cpu_weight,
  }
}

// (async () => {
//   const account = await getAccount('eosforumtest')
//   console.log(account)
// })()