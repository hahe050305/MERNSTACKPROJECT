const mongoose = require('mongoose');

const DetailSchema = new mongoose.Schema({
    pickupLocation: { type: String, required: true },
    quantity: { type: Number, required: true },
    description: { type: String, required: true },
    weight: { type: Number, required: true },
    deliveryLocation: { type: String, required: true },
    deliveryDate: { type: Date, required: true },
    preferredTime: { type: String, required: true },
    mode: { type: String, required: true }
});

const Detail = mongoose.model('Detail', DetailSchema);
module.exports = Detail;
