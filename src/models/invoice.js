const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    invoiceNumber : {type: String, required:true, unique:true},
    order:{type:mongooseSchema.Types.ObjectId, ref:'Order',required:true},
    user:{type:mongooseSchema.Types.ObjectId,ref:'User',required:true},
    product:{type:mongooseSchema.Types.ObjectId,ref:'Product',required:true},
    quantity:{type:Number, required:true},
    totalPrice:{type:Number, required:true},
    status:{type:String,enum:['Paid','Pending','Cancelled'],default:'Paid'},
    createdAt:{type:Date, default:new Date().toISOString()}
})

module.exports = mongoose.model('Invoice',invoiceSchema);