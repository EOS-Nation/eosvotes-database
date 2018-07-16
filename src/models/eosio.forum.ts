import { Schema } from 'mongoose';
import { BaseActionSchema } from './base';

// Models for eosio.forum
// https://github.com/eoscanada/eosio.forum/blob/master/abi/forum.abi
export const PostSchema = new Schema(Object.assign({
    // Required
    poster: {
        type: String,
        required: 'poster'
    },
    post_uuid: {
        type: String,
        required: 'post_uuid'
    },
    content: {
        type: String,
        required: 'content'
    },
    // Optional
    reply_to_poster: {
        type: String
    },
    reply_to_post_uuid: {
        type: String
    },
    certify: {
        type: Boolean
    },
    json_metadata: {
        type: Object,
        set: (v: any) => {
            if (!v) return {}
            return JSON.parse(v)
        },
        get: (v: any) => { return v }
    }
}, BaseActionSchema))

export const ProposeSchema = new Schema(Object.assign({
    proposer: {
        type: String,
        required: 'proposer'
    },
    proposal_name: {
        type: String,
        required: 'proposal_name'
    },
    title: {
        type: String,
        required: 'title'
    },
    proposal_json: {
        type: Object,
        set: (v: any) => {
            if (!v) return {}
            return JSON.parse(v)
        },
        get: (v: any) => { return v }
    }
}, BaseActionSchema));

export const UnproposeSchema = new Schema(Object.assign({
    proposer: {
        type: String,
        required: 'proposer'
    },
    proposal_name: {
        type: String,
        required: 'proposal_name'
    }
}, BaseActionSchema));

export const ProposalSchema = new Schema(Object.assign({
    proposal_name: {
        type: String,
        required: 'proposal_name'
    },
    title: {
        type: String,
        required: 'title'
    },
    proposal_json: {
        type: Object,
        set: (v: any) => {
            if (!v) return {}
            return JSON.parse(v)
        },
        get: (v: any) => { return v }
    }
}, BaseActionSchema));

export const UnpostSchema = new Schema(Object.assign({
    poster: {
        type: String,
        required: 'poster'
    },
    post_uuid: {
        type: String,
        required: 'post_uuid'
    }
}, BaseActionSchema));

export const VoteSchema = new Schema(Object.assign({
    voter: {
        type: String,
        required: 'account_name'
    },
    proposer: {
        type: String,
        required: 'proposer'
    },
    proposal_name: {
        type: String,
        required: 'proposal_name'
    },
    proposition_hash: {
        type: String,
        required: 'proposition_hash'
    },
    vote: {
        type: Boolean,
        required: 'vote'
    },
    vote_json: {
        type: Object,
        set: (v: any) => {
            if (!v) return {}
            return JSON.parse(v)
        },
        get: (v: any) => { return v }
    }
}, BaseActionSchema));
