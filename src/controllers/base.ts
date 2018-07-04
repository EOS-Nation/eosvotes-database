import mongoose from 'mongoose';

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
