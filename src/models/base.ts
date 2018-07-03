export const BaseSchema = {
  'act.name': {
      type: String,
      required: true,
  },
  'act.account': {
      type: String,
      required: true,
  },
  block_num: {
      type: Number,
      required: true,
  },
  block_time: {
      type: String,
      required: true,
  },
  trx_id: {
      type: String,
      required: true,
      unique: true
  }
}