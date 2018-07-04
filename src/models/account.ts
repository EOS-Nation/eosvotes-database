import { Schema } from 'mongoose';
import { BaseSchema } from './base';

export const AccountSchema = new Schema(Object.assign({
    // Required
    account_name: {
        type: String,
        required: true
    },
    net_weight: {
        type: Number,
        required: true
    },
    cpu_weight: {
        type: Number,
        required: true
    }
}, BaseSchema));
