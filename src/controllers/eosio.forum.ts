import mongoose from 'mongoose';
import { PostSchema, RemoveSchema, VoteSchema } from '../models/eosio.forum';
import { baseSave } from './base';

// Save to MongoDB methods
export function savePost(data: any) {
  return baseSave(data, mongoose.model('Post', PostSchema))
}

export function saveRemove(data: any) {
  return baseSave(data, mongoose.model('Remove', RemoveSchema))
}

export function saveVote(data: any) {
  return baseSave(data, mongoose.model('Vote', VoteSchema))
}
