import mongoose from "mongoose";

const TicketModel = mongoose.model('tickets', new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    purchase_datetime: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true },

}))

export default TicketModel