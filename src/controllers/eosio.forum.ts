import mongoose from 'mongoose';
import { PostSchema, RemoveSchema, VoteSchema } from '../models/eosio.forum';

// Controllers = CRUD operations for MongoDB

// Schemas
const Post = mongoose.model('Post', PostSchema);
const Remove = mongoose.model('Remove', RemoveSchema);
const Vote = mongoose.model('Vote', VoteSchema);

// Save to MongoDB methods
export function savePost(data: any) {
  const post = new Post(data)
  post.save((err, response) => {
    if (err) { console.error(err) }
    console.log(response)
  })
}

export function saveRemove(data: any) {
  const remove = new Remove(data)
  remove.save((err, response) => {
    if (err) { console.error(err) }
    console.log(response)
  })
}

export function saveVote(data: any) {
  const vote = new Vote(data)
  vote.save((err, response) => {
    if (err) { console.error(err) }
    console.log(response)
  })
}