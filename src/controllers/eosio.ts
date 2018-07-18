import mongoose from "mongoose";
import { DelegatebwSchema, UndelegatebwSchema } from "../models/eosio";
import { baseSave } from "./base";

export function saveUndelegatebw(data: any) {
  return baseSave(data, mongoose.model("Undelegatebw", UndelegatebwSchema));
}

export function saveDelegatebw(data: any) {
  return baseSave(data, mongoose.model("Delegatebw", DelegatebwSchema));
}
