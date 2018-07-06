const Eos = require('eosjs')

const httpEndpoint = 'https://api.eosn.io'
const chainId = 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
const actor = process.env.EOS_ACTOR
const permission = process.env.EOS_PERMISSION
const keyProvider = process.env.EOS_KEY_PROVIDER

if (!actor) throw new Error('set environment variable = EOS_ACTOR')
if (!permission) throw new Error('set environment variable = EOS_PERMISSION')
if (!keyProvider) throw new Error('set environment variable = EOS_KEY_PROVIDER')

const eos = Eos({httpEndpoint, chainId, keyProvider})

function post (account: string,
               post_uuid: string,
               title: string,
               content: string,
               reply_to_account: string = "",
               reply_to_post_uuid: string = "",
               certify: number = 1,
               json_metadata: string = "") {
  return eos.transaction(
    {
      actions: [
        {
          account: 'eosforumtest',
          name: 'post',
          authorization: [{
            actor,
            permission
          }],
          data: {
            account,
            post_uuid,
            title,
            content,
            reply_to_account,
            reply_to_post_uuid,
            certify,
            json_metadata
          }
        }
      ]
    }
  )
}

(async () => {
  await post(actor, '12345', 'Test', 'Test', '', '', 1, '{"hello":"world"}');
  console.log('posted')
})()
