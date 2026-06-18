const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    invoiceNumber : { type: String, required: true, unique: true },
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ['Paid', 'Pending', 'Cancelled'], default: 'Paid' },
    createdAt: { type: Date, default: new Date().toLocaleString() }
});

module.exports = mongoose.model('Invoice',invoiceSchema);