import mongoose from 'mongoose';
import { baseSave } from './base';
import { UndelegatebwSchema, DelegatebwSchema } from '../models/eosio';

export function saveUndelegatebw(data: any) {
  return baseSave(data, mongoose.model('Undelegatebw', UndelegatebwSchema))
}

export function saveDelegatebw(data: any) {
  return baseSave(data, mongoose.model('Delegatebw', DelegatebwSchema))
}
