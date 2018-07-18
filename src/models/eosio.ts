import { Schema } from "mongoose";
import { BaseActionSchema } from "./base";

// Models = Schemas for MongoDB
export const DelegatebwSchema = new Schema(Object.assign({
    // Required
    from: {
        type: String,
        required: true,
    },
    receiver: {
        type: String,
        required: true,
    },
    stake_net_quantity: {
        type: String,
        required: true,
    },
    stake_cpu_quantity: {
        type: String,
        required: true,
    },
    transfer: {
        type: Boolean,
        required: true,
    },
}, BaseActionSchema));

export const UndelegatebwSchema = new Schema(Object.assign({
    // Required
    from: {
        type: String,
    },
    receiver: {
        type: String,
    },
    unstake_net_quantity: {
        type: String,
    },
    unstake_cpu_quantity: {
        type: String,
    },
}, BaseActionSchema));
