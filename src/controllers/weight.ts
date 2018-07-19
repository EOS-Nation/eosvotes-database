import mongoose from "mongoose";
import { getAccount } from "../actions";
import { WeightSchema } from "../models/weight";
import { baseSave } from "./base";

/**
 * Fetches Account Details and saves it's total Weight to MongoDB
 *
 * @param {string} account_name Account Name
 * @returns {Promise}
 */
export function saveWeight(account_name: string) {
  return getAccount(account_name)
    .then((data) => {
      if (data) { baseSave(data, mongoose.model("Weight", WeightSchema)); }
    })
    .catch((error) => {
      if (error) { console.log(error); }
    });
}
