import mongoose from 'mongoose';
import { PostSchema, UnpostSchema, ProposeSchema, UnproposeSchema, VoteSchema } from '../models/eosio.forum';
import { baseSave } from './base';

// Save to MongoDB methods
// https://github.com/eoscanada/eosio.forum/blob/master/abi/forum.abi
export function savePost(data: any) {
  return baseSave(data, mongoose.model('Post', PostSchema))
}

export function saveUnpost(data: any) {
  return baseSave(data, mongoose.model('Unpost', UnpostSchema))
}

export function savePropose(data: any) {
  return baseSave(data, mongoose.model('Propose', ProposeSchema))
}

export function saveUnpropose(data: any) {
  return baseSave(data, mongoose.model('Unpropose', UnproposeSchema))
}

export function saveVote(data: any) {
  return baseSave(data, mongoose.model('Vote', VoteSchema))
}
