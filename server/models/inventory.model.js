import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const inventorySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    lowStockThreshold: {
        type: Number,
        default: 10
    }
}, {
    timestamps: true
});

export const Inventory = model('Inventory', inventorySchema);