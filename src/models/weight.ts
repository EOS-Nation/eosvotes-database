import { Schema } from "mongoose";

export const WeightSchema = new Schema(Object.assign({
    // Required
    account_name: {
        type: String,
        required: true,
    },
    net_weight: {
        type: Number,
        required: true,
    },
    cpu_weight: {
        type: Number,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    head_block_num: {
        type: Number,
        required: true,
    },
    head_block_time: {
        type: String,
        required: true,
    },
}));
