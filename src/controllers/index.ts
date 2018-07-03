import mongoose from 'mongoose';
import { PostSchema, RemoveSchema, VoteSchema } from '../models/eosio.forum';
import { UndelegatebwSchema, DelegatebwSchema } from '../models/eosio';

// Controllers = CRUD operations for MongoDB

// Base Save Operation
export function baseSave(data: any, Model: mongoose.Model<mongoose.Document>) {
  const model = new Model(data)
  model.save((err, response) => {
    if (err) {
      switch (err.code) {
      case 11000:
        console.log('duplicate', data['action.name'])
        break
      default:
        console.error(err)
      }
    } else {
      console.log('saving', data['action.name'])
    }
  })
}

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

export function saveUndelegatebw(data: any) {
  return baseSave(data, mongoose.model('Undelegatebw', UndelegatebwSchema))
}

export function saveDelegatebw(data: any) {
  return baseSave(data, mongoose.model('Delegatebw', DelegatebwSchema))
}
