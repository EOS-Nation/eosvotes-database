import mongoose from "mongoose";
import { getAccount } from "../actions";
import { AccountSchema } from "../models/account";
import { baseSave } from "./base";

/**
 * Fetches Account Details and saves it to MongoDB
 *
 * @param {string} account_name Account Name
 * @returns {Promise}
 */
export function saveAccount(account_name: string) {
  getAccount(account_name)
    .then((data) => {
      baseSave(data, mongoose.model("Account", AccountSchema));
    })
    .catch((error) => {
      if (error) { console.log(error); }
    });
}
