const mongoose = require('mongoose');//pulls db ODM framework toolsets

const orderSchema = new mongoose.Schema({
  //defines standard key mappings and properties rules for storing db details
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },//references document Object IDs belonging inside  User Collections
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },//links document object mappings tracking items explicitly inside product tables
  quantity: { type: Number, required: true, min: 1 },//numeric storage metric that requires minimum sizes of 1
  totalPrice: { type: Number, required: true, min: 0 },//financial floating value data tracks total balances
  createdAt: { type: Date, default: new Date().toISOString() }//generates timestamps indicating precisely when rows got created automatically
});

module.exports = mongoose.model('Order', orderSchema);//turns schema into compliation moduyle blocks titled:'Order' 