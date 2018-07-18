export const BaseSchema = {
    "action.block_num": {
        type: Number,
        required: true,
    },
    "action.block_time": {
        type: String,
        required: true,
    },
};

export const BaseActionSchema = Object.assign({
  "action.name": {
      type: String,
      required: true,
  },
  "action.account": {
      type: String,
      required: true,
  },
  "action.trx_id": {
      type: String,
      required: true,
      unique: true,
  },
}, BaseSchema);
