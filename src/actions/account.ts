import axios from "axios";

/**
 * Get Actions
 *
 * @param {string} account_name Account Name
 * @param {string} [api] EOSIO API endpoint with filters
 * @returns {Object} Account Details
 */
export function getAccount(account_name: string, api= "https://api.eosn.io") {
  const url = `${api}/v1/chain/get_account`;
  const configs = { responseType: "JSON" };
  return axios.post(url, {account_name}, configs)
    .then((request) => {
      return accountFilter(request.data);
    })
    .catch((error) => {
      if (error) { console.error(error); }
    });
}

export function accountFilter(data: any) {
  return {
    head_block_num: data.head_block_num,
    head_block_time: data.head_block_time,
    account_name: data.account_name,
    net_weight: data.net_weight,
    cpu_weight: data.cpu_weight,
  };
}

// (async () => {
//   const data = await getAccount("deniscarrier");
//   console.log(data);
// })();
