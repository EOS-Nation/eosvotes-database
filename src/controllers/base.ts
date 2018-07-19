import mongoose from "mongoose";

// Base Save Operation
export function baseSave(data: any, Model: mongoose.Model<mongoose.Document>) {
  const model = new Model(data);
  const account = data.action ? data.action.account : "";
  const name = data.action ? data.action.name : "";
  const trx_id = data.action ? data.action.trx_id : "";

  model.save((err, response) => {
    if (err) {
      switch (err.code) {
      case 11000:
        // console.log("duplicate", account, name, trx_id);
        break;
      default:
        console.error(err);
      }
    } else {
      // console.log("saving", account, name, trx_id);
    }
  });
}
