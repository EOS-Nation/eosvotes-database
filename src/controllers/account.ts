import mongoose from 'mongoose';
import { AccountSchema } from '../models/account';
import { baseSave } from './base';

export function saveAccount(data: any) {
  return baseSave(data, mongoose.model('Account', AccountSchema))
}
