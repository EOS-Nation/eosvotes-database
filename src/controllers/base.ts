import mongoose from 'mongoose';

// Base Save Operation
export function baseSave(data: any, Model: mongoose.Model<mongoose.Document>) {
  const model = new Model(data)
  model.save((err, response) => {
    if (err) {
      switch (err.code) {
      case 11000:
        console.log('duplicate', data.action.account, data.action.name, data.action.trx_id)
        break
      default:
        console.error(err)
      }
    } else {
      console.log('saving', data.action.account, data.action.name, data.action.trx_id)
    }
  })
}
